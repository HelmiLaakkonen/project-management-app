const express = require("express");
const router = express.Router();
const db = require("../db/connection");

router.get("/", (req, res) => {
  db.query("SELECT team_name FROM teams", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    res.json({ teams: results }); 
  });
});

module.exports = router;
