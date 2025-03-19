import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    },[]);
    const fetchProfile = () => {
      const token = localStorage.getItem("token");
      fetch('http://localhost:3000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Response status:', response.status); // Log the response status
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || 'Failed to fetch user info');
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setName(data.username);
            setEmail(data.email);
          }
        })
        .catch((err) => {
          console.error('Error fetching user info:', err.message);
          setError('An error occurred while fetching user info. Please try again.');
        });
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      setError('Both fields are required');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from the current password');
      return;
    }

    const token = localStorage.getItem("token");
    fetch('http://localhost:3000/api/passwordChange', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSnackbarOpen(true);
          setError('');
        }
      })
      .catch(() => {
        setError('An error occurred while changing password. Please try again.');
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDeleteSnackbarClose = () => {
    setDeleteSnackbarOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("token");
  
    fetch('http://localhost:3000/api/deleteAccount', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        let data = await response.json();
        console.log("Response data:", data);
  
        if (!response.ok) {
          throw new Error(data.message || "Failed to delete account");
        }
  
        // Clear local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting account:", error.message);
        setError("An error occurred while deleting your account. Please try again.");
      });
  
    setDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}
      <Typography variant="body1" gutterBottom>
        Userame: {name}
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
          InputProps={{
            sx: { backgroundColor: 'white' }
          }}
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
          InputProps={{
            sx: { backgroundColor: 'white' }
          }}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 3, backgroundColor: '#c0e2ec', color: 'white' }}
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: 3, backgroundColor: '#ffb6c1', color: 'white' }}
        onClick={handleDialogOpen}
      >
        Delete Account
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Your password is successfully changed"
        ContentProps={{
            sx: { backgroundColor: '#ffb6c1' }
          }}
      />
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleDeleteSnackbarClose}
        message="Account deleted successfully!"
        ContentProps={{
            sx: { backgroundColor: '#ffb6c1' }
          }}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>Delete Your Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;