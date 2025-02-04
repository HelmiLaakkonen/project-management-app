import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function NavBar({ sidebarOpen }) {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: '#dda0dd',
        marginLeft: sidebarOpen ? '240px' : '0',
        width: sidebarOpen ? `calc(100% - 240px)` : '100%',
        transition: 'margin 0.3s ease, width 0.3s ease',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;