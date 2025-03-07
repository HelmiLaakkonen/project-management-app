import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  IconButton,
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
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Notifications</h2>
        <IconButton onClick={toggleNotifications}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="🔔 New comment on your task" />
        </ListItem>
        <ListItem>
          <ListItemText primary="📅 Upcoming meeting tomorrow" />
        </ListItem>
        <ListItem>
          <ListItemText primary="✅ Your task has been completed" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Notifications;
