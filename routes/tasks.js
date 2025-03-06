const express = require("express");
const router = express.Router();
const db = require("../db/connection");

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
  const { task_name, description, status } = req.body;

  if (!task_name || !status) {
    return res.status(400).json({ error: "Task name and status are required" });
  }

  const query = `INSERT INTO tasks (task_name, description, status) VALUES (?, ?, ?)`;

  db.execute(query, [task_name, description, status], (err, results) => {
    if (err) {
      console.error(("Error adding task: ", err));
      return res.status(500).json({ error: "Database error" });
    }
    res
      .status(201)
      .json({ message: "Task added succesfully", task_id: results.insertId });
  });
});

module.exports = router;
