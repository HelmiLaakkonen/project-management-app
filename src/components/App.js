import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Notification from "./Notification";
import Login from "./Login";
import { AuthProvider, useAuth } from "../auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <AuthContent />
        </Box>
      </Router>
    </AuthProvider>
  );
}

function AuthContent() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isAuthenticated && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? <Notification /> : <Navigate to="/login" />
            }
          />
        </Routes>
        {isAuthenticated && <Footer />}
      </Box>
    </>
  );
}

export default App;
