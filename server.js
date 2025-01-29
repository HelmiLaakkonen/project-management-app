const express = require("express");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/tasks");
const calenderRouter = require("./routes/calender");

const db = require("./db/connection");

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use("/api", tasksRouter, calenderRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
