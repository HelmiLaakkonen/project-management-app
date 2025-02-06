import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirect

  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      username,
      password
    };

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setAuth(true);
      } else {
        if (data.message === 'Invalid username or password') {
          setError('The username or password you entered is incorrect.');
        } else if (data.message === 'No user found') {
          setError('No user found with that username.');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      }
    })
    .catch((err) => {
      console.error('Error during login:', err);
      if (err.message.includes('NetworkError') || err.message.includes('Failed to fetch')) {
        setError('Unable to connect to the server. Please check your internet connection or try again later.');
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    });
  };

  // Handle redirect to Register page using navigate
  const handleRegisterRedirect = () => {
    navigate('/register'); // Use navigate to redirect to /register
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Error Message */}
          {error && (
            <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Login
          </Button>
        </form>

        {/* Register Redirect Button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleRegisterRedirect}
        >
          Don't have an account? Register here
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
