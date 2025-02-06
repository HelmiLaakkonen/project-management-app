import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

function Register({ setAuth }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {error && <Typography color="error" variant="body2">{error}</Typography>}

          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
