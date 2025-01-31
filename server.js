const express = require("express");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/tasks");
const db = require("./db/connection");
const cors = require("cors");

dotenv.config();

const app = express(); // Define app first

app.use(cors()); // Now use CORS after app is defined

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use("/api", tasksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
