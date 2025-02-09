import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Profile() {
  const [name] = useState('Testi Nimi');
  const [email] = useState('sähköposti?');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      setError('Both fields are required');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from the current password');
      return;
    }

    // Implement password change logic here
    console.log('Password changed');
    setSnackbarOpen(true);
    setError('');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteAccount = () => {
    // Implement delete account logic here
    console.log('Account deleted');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1" gutterBottom>
        Name: {name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={!!error && !currentPassword}
          helperText={!!error && !currentPassword ? error : ''}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={!!error && (!newPassword || currentPassword === newPassword)}
          helperText={!!error && (!newPassword || currentPassword === newPassword) ? error : ''}
        />
        <Button
          variant="contained"
          color="ChangePasswordButton"
          sx={{ marginTop: 2 }}
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>
      </Box>
      <Button
        variant="contained"
        color="DeleteButton"
        sx={{ marginTop: 3 }}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Your password is successfully changed"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default Profile;