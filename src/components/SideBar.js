import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          position: "fixed", // Keeps the sidebar in place
          height: "100vh", // Makes sure it stays full height
          top: 64, // Adjust based on navbar height
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/calender">
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
      </List>
    </Drawer>
  );
}

export default SideBar;
