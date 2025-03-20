import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const fontStyle = {
  fontFamily: `"Poppins", sans-serif`,
};

function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleRegister = (e) => {
    e.preventDefault();

    const registerData = { username, email, password };

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setAuth(true);
      } else {
        setError(data.message || 'Registration failed');
      }
    })
    .catch((err) => {
      setError('An error occurred while registering. Please try again.');
    });
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Use navigate to redirect to /register
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
          Register
        </Typography>

        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          {/* Username Field */}
          <TextField
            label="Username"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2, ...fontStyle }}
            InputLabelProps={{
              style: { color: "#d63384" }, // Match the color of the 'Register' text
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
                  },
                  '&:hover fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
                  },
                },
              },
            }}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2, ...fontStyle }}
            InputLabelProps={{
              style: { color: "#d63384" }, // Match the color of the 'Register' text
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
                  },
                  '&:hover fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d63384', // Match the color of the 'Register' text
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
            Register
          </Button>
        </form>

        {/* Login Redirect Button */}
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLoginRedirect}
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
          Already have an account? Login here
        </Button>
      </Paper>
    </Container>
  );
}
  

export default Register;
