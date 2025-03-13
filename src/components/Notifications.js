import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

function Notifications({ open, toggleNotifications }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleNotifications}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fdfded", // Light pastel color to match sidebar
          color: "#5a5a5a", // Muted text color for readability
          padding: "16px",
          transition: "transform 0.3s ease", // Smooth transition
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
          Notifications
        </Typography>
        <IconButton onClick={toggleNotifications} sx={{ color: "#d32f2f" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ marginBottom: "10px" }} />

      {/* Notifications List */}
      <List>
        <ListItem
          sx={{
            "&:hover": { backgroundColor: "#f8bbd0" },
            borderRadius: "8px",
          }}
        >
          <ListItemText primary="🔔 New comment on your task" />
        </ListItem>
        <ListItem
          sx={{
            "&:hover": { backgroundColor: "#f8bbd0" },
            borderRadius: "8px",
          }}
        >
          <ListItemText primary="📅 Upcoming meeting tomorrow" />
        </ListItem>
        <ListItem
          sx={{
            "&:hover": { backgroundColor: "#f8bbd0" },
            borderRadius: "8px",
          }}
        >
          <ListItemText primary="✅ Your task has been completed" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Notifications;
