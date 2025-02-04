import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Sidebar from './SideBar';
import Calender from './Calender';
import Profile from './Profile';

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
      <Box>
        <Calender />
      </Box>
    </Container>
  );
}

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default Dashboard;