const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const authenticate = require("../middleware/authenticate");

router.get("/tasks", authenticate, (req, res) => {
  const userId = req.user.userId;
  console.log("Extracted User ID:", userId);

  const query = `
    SELECT tasks.task_id, tasks.task_name, tasks.description, tasks.team_id
    FROM tasks
    JOIN taskassignments ON tasks.task_id = taskassignments.task_id
    WHERE taskassignments.user_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ tasks: results });
  });
});

module.exports = router;