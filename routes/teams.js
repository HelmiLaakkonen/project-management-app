const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const authenticate = require("../middleware/authenticate");

// Get teams for logged-in user
router.get("/teams", authenticate, (req, res) => {
  const userId = req.user.userId;
  console.log("Extracted User ID:", userId);

  const query = `
    SELECT teams.team_id, teams.team_name, created_by
    FROM teams
    JOIN teammemberships ON teams.team_id = teammemberships.team_id
    WHERE teammemberships.user_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ teams: results });
  });
});

// Add a new team
router.post("/teams", authenticate, (req, res) => {
  const { team_name } = req.body;
  const userId = req.user.userId; // Get logged-in user's ID

  if (!team_name) {
    return res.status(400).json({ error: "Team name is required" });
  }

  // Insert new team and get its ID
  const insertTeamQuery = `INSERT INTO teams (team_name, created_by) VALUES (?, ?)`;
  
  db.query(insertTeamQuery, [team_name, userId], (err, result) => {
    if (err) {
      console.error("Error creating team:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const teamId = result.insertId; // Get new team's ID

    // Add the creator to teammemberships
    const insertMembershipQuery = `INSERT INTO teammemberships (team_id, user_id) VALUES (?, ?)`;

    db.query(insertMembershipQuery, [teamId, userId], (err) => {
      if (err) {
        console.error("Error adding creator to team:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Team created successfully",
        team: { team_id: teamId, team_name },
      });
    });
  });
});


router.get("/teams/:teamId/members", authenticate, (req, res) => {
  const teamId = req.params.teamId;

  const query = `
    SELECT u.username, t.created_by 
    FROM teammemberships tm
    JOIN users u ON tm.user_id = u.user_id
    JOIN teams t ON t.team_id = tm.team_id
    WHERE tm.team_id = ?;
  `;

  db.query(query, [teamId], (err, results) => {
    if (err) {
      console.error("Error fetching team members:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ members: [], created_by: null });
    }

    const createdBy = results[0].created_by;
    const members = results.map((row) => ({ username: row.username }));

    res.json({ members, created_by: createdBy });
  });
});

router.post("/teams/:teamId/add-member", authenticate, (req, res) => {
  const teamId = req.params.teamId;
  const { username } = req.body;
  const userId = req.user.userId;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  // Check if the user is the team creator
  const checkOwnerQuery = `SELECT created_by FROM teams WHERE team_id = ?`;

  db.query(checkOwnerQuery, [teamId], (err, results) => {
    if (err) {
      console.error("Error checking team ownership:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (results[0].created_by !== userId) {
      return res.status(403).json({ error: "Only the team creator can add members" });
    }

    // Get the user ID of the person being added
    const getUserIdQuery = `SELECT user_id FROM users WHERE username = ?`;

    db.query(getUserIdQuery, [username], (err, userResults) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const newMemberId = userResults[0].user_id;

      const insertQuery = `INSERT INTO teammemberships (team_id, user_id) VALUES (?, ?)`;

      db.query(insertQuery, [teamId, newMemberId], (err) => {
        if (err) {
          console.error("Error adding member:", err);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ success: true, message: "Member added successfully" });
      });
    });
  });
});

router.delete("/teams/:teamId", authenticate, (req, res) => {
  const userId = req.user.userId;
  const { teamId } = req.params;

  // Check if the user is the creator of the team
  const checkQuery = `SELECT created_by FROM teams WHERE team_id = ?`;

  db.query(checkQuery, [teamId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (results[0].created_by !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this team" });
    }

    // If authorized, delete team and memberships
    const deleteMemberships = `DELETE FROM teammemberships WHERE team_id = ?`;
    const deleteTeam = `DELETE FROM teams WHERE team_id = ?`;

    db.query(deleteMemberships, [teamId], (err) => {
      if (err) {
        console.error("Error deleting memberships:", err);
        return res.status(500).json({ error: "Failed to delete team memberships" });
      }

      db.query(deleteTeam, [teamId], (err) => {
        if (err) {
          console.error("Error deleting team:", err);
          return res.status(500).json({ error: "Failed to delete team" });
        }

        res.json({ message: "Team deleted successfully" });
      });
    });
  });
});



module.exports = router;
