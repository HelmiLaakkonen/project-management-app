import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState(false);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setName(data.username);
          setEmail(data.email);
        }
      })
      .catch(() => {
        setError(
          "An error occurred while fetching user info. Please try again."
        );
      });
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }
  
    if (currentPassword === newPassword) {
      setError("New password must be different from the current password");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:3000/api/passwordChange", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Password updated successfully") {
          setSnackbarOpen(true);
          setError(""); // Reset error message
          setCurrentPassword("");
          setNewPassword("");
        } else if (data.error || data.message) {
          setError(data.message); // Show error message from the server
        }
      })
      .catch(() => {
        setError("An error occurred while changing the password. Please try again.");
      });
};

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/deleteAccount", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        let data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to delete account");
        }

        // Clear local storage and redirect to login page
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((error) => {
        setError(
          "An error occurred while deleting your account. Please try again."
        );
      });

    setDialogOpen(false);
    setDeleteSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        mt: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: "500px",
          borderRadius: "16px",
          backgroundColor: "#fff5f8", // Soft pastel pink
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Elegant shadow
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#d63384" }}
        >
          User Profile
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body1"
            align="center"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1">
          <strong>Username:</strong> {name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Email:</strong> {email}
        </Typography>

        {/* Change Password Section */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#d63384", mt: 2 }}
        >
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          type="password"
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{ sx: { backgroundColor: "white", borderRadius: "8px" } }}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{ sx: { backgroundColor: "white", borderRadius: "8px" } }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#f48fb1",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#d81b60" },
          }}
          onClick={handlePasswordChange}
        >
          Change Password
        </Button>

        {/* Delete Account Section */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#ff6961",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
          onClick={() => setDialogOpen(true)}
        >
          Delete Account
        </Button>

        {/* Snackbars */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Your password was successfully changed!"
          ContentProps={{ sx: { backgroundColor: "#f48fb1" } }}
        />
        <Snackbar
          open={deleteSnackbarOpen}
          autoHideDuration={2000}
          onClose={() => setDeleteSnackbarOpen(false)}
          message="Account deleted successfully!"
          ContentProps={{ sx: { backgroundColor: "#ff6961" } }}
        />

        {/* Delete Account Confirmation Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>
            Confirm Account Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your account? This action is
              permanent and cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteAccount} sx={{ color: "#d32f2f" }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default Profile;
