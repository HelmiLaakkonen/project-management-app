import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const fontStyle = {
  fontFamily: `"Poppins", sans-serif`,
};

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize navigate for redirection

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
        setAuth(true);  // Update authentication state
        console.log('token');
        // Redirect to the dashboard after successful login
        navigate('/dashboard');  // Navigate to dashboard page
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8", // Light background color
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          backgroundColor: "#fff5f8", // Soft pastel pink background
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft elegant shadow
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#d63384", mb: 2, ...fontStyle }}
        >
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          {/* Username Field */}
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2, ...fontStyle }}
            InputLabelProps={{
              style: { color: "#d63384" },
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d63384',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d63384',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d63384',
                  },
                },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2, ...fontStyle }}
            InputLabelProps={{
              style: { color: "#d63384" },
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d63384',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d63384',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d63384',
                  },
                },
              },
            }}
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
            sx={{
              marginBottom: 2,
              backgroundColor: "#85a2ff", // Soft pastel blue color
              color: "white",
              fontWeight: "bold",
              ...fontStyle,
              "&:hover": {
                backgroundColor: "#6f8cff", // Slightly darker blue on hover
              },
            }}
          >
            Login
          </Button>
        </form>

        {/* Register Redirect Button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleRegisterRedirect}
          sx={{
            ...fontStyle,
            borderColor: "#85a2ff",
            color: "#85a2ff",
            "&:hover": {
              borderColor: "#6f8cff",
              color: "#6f8cff",
            },
          }}
        >
          Hello new user! Don't have an account? Register here
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;