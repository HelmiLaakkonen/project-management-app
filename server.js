const express = require("express");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const db = require("./db/connection");
// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use('/users', usersRouter);

console.log('Server is running...');

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
