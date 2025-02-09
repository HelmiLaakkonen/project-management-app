import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import Sidebar from './SideBar';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Footer from './Footer';
import theme from './Theme';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#ffffed' }}>
        <NavBar sidebarOpen={sidebarOpen} />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar open={sidebarOpen} toggleDrawer={toggleSidebar} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: '#fdfded',
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;