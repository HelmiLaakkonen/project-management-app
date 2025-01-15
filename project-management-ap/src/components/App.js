import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './SideBar';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Calender from './Calender';
import Notifications from './Notifications';


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Sidebar and Main Content */}
        <Box sx={{ display: 'flex', flex: 1 }}>

          <Sidebar />
          {          /* <Notifications/>*/
          }
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: '#f5f5f5',
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <NavBar />
            <Dashboard />
            <Footer />
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
