const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ tasks: results });
  });
});

module.exports = router;