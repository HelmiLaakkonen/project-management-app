import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 240;

function SideBar({ open, toggleDrawer }) {
  return (
    <>
      <IconButton 
        onClick={toggleDrawer} 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          zIndex: 1300,
          transition: 'transform 0.3s ease', // Add transition for smooth icon change
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate icon when open
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#edfffb', //'#ffeded',
            transition: 'width 0.3s ease', // Add transition for smooth drawer open/close
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ padding: 2 }}>
          <h2>Dashboard</h2>
        </Box>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/settings" onClick={toggleDrawer}>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={toggleDrawer}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default SideBar;