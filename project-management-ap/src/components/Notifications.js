import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function Notifications() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="right"
    >
      <Box sx={{ padding: 2 }}>
        <h2>Dashboard</h2>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Notifications;
