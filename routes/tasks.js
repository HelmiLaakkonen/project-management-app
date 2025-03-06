const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const dayjs = require("dayjs");

router.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ tasks: results });
  });
});

router.post("/tasks", (req, res) => {
  const { task_name, description, status, team_id } = req.body;

  if (!task_name || !status || !team_id) {
    // Ensure team_id is included
    console.error("Missing fields:", { task_name, status, team_id });
    return res
      .status(400)
      .json({ error: "Task name, status, and team ID are required" });
  }

  const query = `INSERT INTO tasks (task_name, description, status, team_id) VALUES (?, ?, ?, ?)`;

  db.execute(
    query,
    [task_name, description, status, team_id],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error", details: err });
      }

      console.log("Task added successfully:", results);
      res
        .status(201)
        .json({
          message: "Task added successfully",
          task_id: results.insertId,
        });
    }
  );
});

module.exports = router;
