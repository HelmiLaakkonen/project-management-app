import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

function NavBar({ setAuth, sidebarOpen, toggleNotifications }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    setAuth(false); // Update authentication state
    navigate("/dashboard");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#f8bbd0", // Pastel pink
        marginLeft: sidebarOpen ? "240px" : "0",
        width: sidebarOpen ? `calc(100% - 240px)` : "100%",
        transition: "margin 0.3s ease, width 0.3s ease",
      }}
    >
      <Toolbar>
        {/* Project Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            paddingLeft: sidebarOpen ? "0" : "48px",
            color: "white",
          }}
        >
          Project Manager
        </Typography>

        {/* Notification Icon */}
        <IconButton
          onClick={toggleNotifications}
          sx={{
            color: "white",
            marginRight: "10px",
            backgroundColor: "#1976d2", // Blue button like in the 3rd image
            "&:hover": { backgroundColor: "#1565c0" }, // Darker blue on hover
          }}
        >
          <NotificationsIcon />
        </IconButton>

        {/* Logout Button */}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
