import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './SideBar';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Calender from './Calender'; 
import Notifications from './Notifications';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';

// Layout component
function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f5f5', padding: 3, display: 'flex', flexDirection: 'column' }}>
          {/* <NavBar /> */}
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  // Re-check auth state when location changes
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
    console.log('Auth state updated on route change:', !!localStorage.getItem('token'));
  }, [location]);

  // Listen for token changes in localStorage (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
      <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
      <Route path="/dashboard" element={isAuthenticated ? <Layout><NavBar setAuth={setIsAuthenticated} /><Dashboard /></Layout> : <Navigate to="/login" />} />
      <Route path="/calender" element={isAuthenticated ? <Layout><Calender /></Layout> : <Navigate to="/login" />} />
      <Route path="/notifications" element={isAuthenticated ? <Layout><Notifications /></Layout> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
