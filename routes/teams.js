const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const authenticate = require("../middleware/authenticate");

// Get teams for logged-in user
router.get("/teams", authenticate, (req, res) => {
  const userId = req.user.userId;
  console.log("Extracted User ID:", userId);

  const query = `
    SELECT teams.team_id, teams.team_name 
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
  const { teamId } = req.params;

  const query = `
    SELECT users.user_id, users.username 
    FROM users
    JOIN teammemberships ON users.user_id = teammemberships.user_id
    WHERE teammemberships.team_id = ?;
  `;

  db.query(query, [teamId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ members: results });
  });
});

router.delete("/teams/:teamId", authenticate, (req, res) => {
  const teamId = req.params.teamId;
  const userId = req.user.userId;

  // Only delete if user created team
  const checkOwnerQuery = `SELECT created_by FROM teams WHERE team_id = ?`;

  db.query(checkOwnerQuery, [teamId], (err, results) => {
    if (err) {
      console.error("Error checking team owner:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (results[0].created_by !== userId) {
      return res.status(403).json({ error: "You can only delete teams you created" });
    }

    // Delete memberships first
    const deleteMembershipsQuery = `DELETE FROM teammemberships WHERE team_id = ?`;

    db.query(deleteMembershipsQuery, [teamId], (err) => {
      if (err) {
        console.error("Error deleting memberships:", err);
        return res.status(500).json({ error: "Database error" });
      }

      const deleteTeamQuery = `DELETE FROM teams WHERE team_id = ?`;

      db.query(deleteTeamQuery, [teamId], (err) => {
        if (err) {
          console.error("Error deleting team:", err);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ success: true, message: "Team deleted successfully" });
      });
    });
  });
});


module.exports = router;
