const express = require("express");
const dotenv = require("dotenv");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");
const profileRouter = require("./routes/profile");
const bodyParser = require("body-parser");
const db = require("./db/connection");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const teamsRouter = require("./routes/teams");
const authenticate = require("./middleware/authenticate");

// Load env variables
const app = express();

app.use(cors()); // Allow cross-origin requests from any domain
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the routes
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/api", authenticate, tasksRouter);
app.use("/api", authenticate, teamsRouter);
app.use("/api", authenticate, profileRouter);

console.log("Server is running...");

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Available Routes:");
  console.log("Login: http://localhost:" + PORT + "/login");
  console.log("Users: http://localhost:" + PORT + "/users");
  console.log("Register: http://localhost:" + PORT + "/register");
  console.log("Profile: http://localhost:" + PORT + "/profile");
});
