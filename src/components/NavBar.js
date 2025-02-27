import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavBar({ setAuth }) {
  // Accept setAuth from App.js SetIsAuthenticated
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    setAuth(false); // Update authentication state
    navigate("/dashboard");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#f8bbd0" }}>
      {" "}
      {/* Pastel Pink */}
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Manager
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
