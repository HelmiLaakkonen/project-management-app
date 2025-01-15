import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Sidebar from './SideBar'; // Assuming you have a Sidebar component

function Home() {
  return (
    <Container>
      <h2>Home</h2>
      <p>Welcome to the Dashboard</p>
    </Container>
  );
}

function Settings() {
  return (
    <Container>
      <h2>Settings</h2>
      <p>Change your preferences here</p>
    </Container>
  );
}

function Profile() {
  return (
    <Container>
      <h2>Profile</h2>
      <p>Update your profile information</p>
    </Container>
  );
}

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Add Navbar here */}

      {/* Main Content with Sidebar and Routes */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
