const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// READ: Fetch All Dates
router.get("/calendar", (req, res) => {
  const query = "SELECT * FROM calendar"; // Ensure 'calendar' table exists
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ calendar: results });
  });
});

module.exports = router;
