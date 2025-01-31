const express = require("express");
const router = express.Router();
const db = require("../db/connection"); // Ensure this imports your connection

router.get("/tasks", async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks"); // ✅ Fix: Await the promise
    res.json({ tasks });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

module.exports = router;
