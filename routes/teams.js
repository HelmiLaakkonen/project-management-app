const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const authenticate = require("../middleware/authenticate"); 

router.get("/", authenticate, (req, res) => {
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

module.exports = router;
