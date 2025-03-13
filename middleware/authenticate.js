const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader); // Log entire header

  if (!authHeader) {
    console.log(" No Authorization header found");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.replace("Bearer ", "").trim(); // Extract token safely
  console.log("🔑 Received token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(" Token verification failed:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
