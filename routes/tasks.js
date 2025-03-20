const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const dayjs = require("dayjs");
const authenticate = require("../middleware/authenticate");

router.get("/tasks", authenticate, (req, res) => {
  const userId = req.user.userId;
  const query = `
    SELECT tasks.task_id, tasks.task_name, tasks.description, tasks.team_id, tasks.status, tasks.created_at, tasks.due_date
    FROM tasks
    JOIN taskassignments ON tasks.task_id = taskassignments.task_id
    WHERE taskassignments.user_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log("✅ Fetched Tasks:", results); // Debugging: Check if created_at exists
    res.json({ tasks: results });
  });
});

router.post("/tasks", authenticate, (req, res) => {
  const queryTeam = `SELECT team_id FROM teams WHERE team_name = ?`;
  const queryTask = `INSERT INTO tasks (task_name, description, status, team_id) VALUES (?, ?, ?, ?)`;
  const queryAssignment = `INSERT INTO taskassignments (task_id, user_id) VALUES (?, ?)`;

  // Extract values from request
  const { task_name, description, status, team_name } = req.body;

  const userId = req.user.userId;
  console.log("Extracted User ID:", userId);

  if (!task_name || !status || !team_name || !userId) {
    return res.status(400).json({ error: "Missing required fields.." });
  }

  db.execute(queryTeam, [team_name], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ error: "Team not found. Please use an existing team." });
    }

    const team_id = results[0].team_id;

    // Insert the task and get the new task_id
    db.execute(
      queryTask,
      [task_name, description ?? "", status, team_id],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }

        const task_id = results.insertId;

        // Insert into taskassignments
        db.execute(queryAssignment, [task_id, userId], (err) => {
          if (err) {
            console.error("Database error:", err);
            return res
              .status(500)
              .json({ error: "Database error", details: err });
          }

          console.log("Task and assignment added successfully.");
          res.status(201).json({
            message: "Task added successfully and assigned to user",
            task_id,
          });
        });
      }
    );
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
