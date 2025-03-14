const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const dayjs = require("dayjs");
const authenticate = require("../middleware/authenticate");

router.get("/tasks", authenticate, (req, res) => {
  const userId = req.user.userId;
  const query = `
    SELECT tasks.task_id, tasks.task_name, tasks.description, tasks.team_id, tasks.status
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

router.post("/tasks", authenticate, (req, res) => {
  const queryTeam = `SELECT team_id FROM teams WHERE team_name = ?`;
  const queryTask = `INSERT INTO tasks (task_name, description, status, team_id) VALUES (?, ?, ?, ?)`;

  // Extract values from request
  const { task_name, description, status, team_name } = req.body;

  db.execute(queryTeam, [team_name], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Team not found. Please use an existing team." });
    }

    const team_id = results[0].team_id;

    // Insert the task with the correct team_id
    db.execute(queryTask, [task_name, description, status, team_id], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      console.log("Task added successfully:", results);
      res.status(201).json({
        message: "Task added successfully",
        task_id: results.insertId,
      });
    });
  });
});
router.put("/tasks/:task_id", authenticate, (req, res) => {
  const { task_id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE tasks SET status = ? WHERE task_id = ?",
    [status, task_id],
    (err, result) => {
      if (err) {
        console.error("Database update error:", err);
        return res.status(500).json({ error: "Database update failed" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.json({ message: "Task updated succesfully" });
    }
  );
});

module.exports = router;
