import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function NavBar(){
    return (
        <AppBar position="sticky">
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