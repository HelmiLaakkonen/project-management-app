import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './SideBar';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Calender from './Calender';
import Notifications from './Notifications';
import Register from './Register';
import Login from './Login';



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check if the user is authenticated by checking local storage for a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authentication state based on token existence
  }, []);

  // Display loading message while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Handle route redirects based on authentication */}
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              {/* Sidebar and Main Content */}
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
                  <NavBar />
                  <Dashboard />
                  <Footer />
                </Box>
              </Box>
            </Box>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;