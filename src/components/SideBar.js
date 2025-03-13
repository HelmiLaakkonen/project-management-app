import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

function SideBar({ open, toggleSidebar }) {
  return (
    <>
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 11,
          left: 16,
          zIndex: 1300,
          transition: "transform 0.3s ease", // Transition for smooth icon change
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          color: "#e0218a",
          "&:hover": {
            boxShadow: "0 0 10px lightpink",
          },
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#edfffb",
            transition: "width 0.3s ease",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleSidebar}
      >
        <List sx={{ paddingTop: 8 }}>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" sx={{ color: "#e0218a" }} />
          </ListItem>
          <ListItem button component={Link} to="/calender">
            <ListItemText primary="Calendar" sx={{ color: "#e0218a" }} />
          </ListItem>
          <ListItem button component={Link} to="/roadmap">
            <ListItemText primary="Roadmap" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" sx={{ color: "#e0218a" }} />
          </ListItem>
          <ListItem button component={Link} to="/teams">
            <ListItemText primary="Teams" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default SideBar;
