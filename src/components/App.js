import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Calender from "./Calender";
import Roadmap from "./Roadmap";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Teams from "./Teams";

// Layout component with a sticky footer
function Layout({
  children,
  sidebarOpen,
  toggleSidebar,
  notificationsOpen,
  toggleNotifications,
  setAuth,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar
        setAuth={setAuth}
        sidebarOpen={sidebarOpen}
        toggleNotifications={toggleNotifications}
      />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#fdfded",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
        <Notifications
          open={notificationsOpen}
          toggleNotifications={toggleNotifications}
        />
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
      <Route
        path="/register"
        element={<Register setAuth={setIsAuthenticated} />}
      />

      {/* Wrap all authenticated pages in Layout */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/calender"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Calender />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/roadmap"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Roadmap />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/notifications"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Notifications />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/teams"
        element={
          isAuthenticated ? (
            <Layout
              sidebarOpen={sidebarOpen}
              toggleSidebar={toggleSidebar}
              notificationsOpen={notificationsOpen}
              toggleNotifications={toggleNotifications}
              setAuth={setIsAuthenticated}
            >
              <Teams />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
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
