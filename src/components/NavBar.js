import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function NavBar({ sidebarOpen }) {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#ffebf5',
        marginLeft: sidebarOpen ? '240px' : '0',
        width: sidebarOpen ? `calc(100% - 240px)` : '100%',
        transition: 'margin 0.3s ease, width 0.3s ease',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: sidebarOpen ? '0' : '48px', color: '#99c4e0' }}>
          Dashboard
        </Typography>
        <Button color="inherit" sx={{ color: 'black' }}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;