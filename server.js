const express = require("express");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const db = require("./db/connection");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use("/api", tasksRouter);
app.use("/api/auth", authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
