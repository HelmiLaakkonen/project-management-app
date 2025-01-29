const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// READ: Fetch All Tasks
router.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks"; // Ensure 'tasks' table exists
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tasks: results });
  });
});

module.exports = router;
