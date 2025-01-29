import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Sidebar from "./SideBar";
import Calender from "./Calender";

function Home() {
  return (
    <Container>
      <h2>Home</h2>
      <p>Welcome to the Dashboard</p>
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
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      {/* Main Content with Sidebar and Routes */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
