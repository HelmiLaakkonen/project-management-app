import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Sidebar from './SideBar'; // Assuming you have a Sidebar component
import Calender from './Calender';
import axios from 'axios';

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
      <Box>      <Calender />
      </Box>
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

function User() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    // Assuming your backend is running on http://localhost:5000
    axios.get('http://localhost:3000/users') // Make the GET request to the /users route
      .then((response) => {
        // Assuming the backend returns the username in the response body
        setUsername(response.data[0].username); // Set the username from the backend response
        setLoading(false); // Update loading state
      })
      .catch((err) => {
        // Log the error for debugging
        console.error('Error fetching username:', err);

        // Check if the error is related to database connection failure
        if (err.message.includes('ECONNREFUSED') || err.message.includes('connect ECONNREFUSED')) {
          setError('Could not connect to the database. Please check your connection.');
        } else {
          setError('Error fetching username. Please try again later.');
        }

        setLoading(false); // Update loading state
      });
  }, []); // Empty dependency array to run only once when the component is mounted

  return (
    <Container>
      <h2>Username</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p> // Show error message if there was an issue
      ) : (
        <p>{username}</p> // Display the username if successfully fetched
      )}
    </Container>
  );
}

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Main Content with Sidebar and Routes */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
