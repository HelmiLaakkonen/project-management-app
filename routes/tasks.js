const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// CREATE: Add a New Task
router.post("/tasks", (req, res) => {
  const { team_id, task_name, description, due_date, status } = req.body;
  const query = `
    INSERT INTO tasks (team_id, task_name, description, due_date, status) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.execute(
    query,
    [team_id, task_name, description, due_date, status || "pending"],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Task created successfully",
        task_id: results.insertId,
      });
    }
  );
});

// READ: Get All Tasks
router.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks";
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// READ: Get a Single Task by ID
router.get("/tasks/:task_id", (req, res) => {
  const { task_id } = req.params;
  const query = "SELECT * FROM tasks WHERE task_id = ?";
  db.execute(query, [task_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(results[0]);
  });
});

// UPDATE: Update a Task by ID
router.put("/tasks/:task_id", (req, res) => {
  const { task_id } = req.params;
  const { task_name, description, due_date, status } = req.body;
  const query = `
    UPDATE tasks 
    SET task_name = ?, description = ?, due_date = ?, status = ? 
    WHERE task_id = ?
  `;
  db.execute(
    query,
    [task_name, description, due_date, status, task_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task updated successfully" });
    }
  );
});

// DELETE: Delete a Task by ID
router.delete("/tasks/:task_id", (req, res) => {
  const { task_id } = req.params;
  const query = "DELETE FROM tasks WHERE task_id = ?";
  db.execute(query, [task_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;
