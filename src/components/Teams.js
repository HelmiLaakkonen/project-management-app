import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group"; // Team icon

export default function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/teams", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTeams(data.teams || []);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  };

  const handleAddTeam = () => {
    if (!newTeam.trim()) return;
    setAdding(true);
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/teams", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_name: newTeam }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTeams([...teams, data.team]);
        setNewTeam("");
        setAdding(false);
      })
      .catch((error) => {
        console.error("Error adding team:", error);
        setAdding(false);
      });
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
          backgroundColor: "#fff5f8", // Soft pastel pink like Profile
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Elegant shadow
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#d63384" }}
        >
          Teams
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Existing Teams Section */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#d63384", mb: 2 }}
        >
          Existing Teams
        </Typography>
        {teams.length > 0 ? (
          <Box>
            {teams.map((team, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  padding: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                  backgroundColor: "#ffeff4",
                  borderRadius: "10px",
                  mb: 1.5,
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#ffcdd2",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <GroupIcon sx={{ color: "#b80d57", marginRight: "10px" }} />
                {team?.team_name ?? "No Name Available"}
              </Paper>
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "#666", textAlign: "center" }}>
            No teams found.
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Add New Team Section */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#d63384", mt: 2 }}
        >
          Add New Team
        </Typography>
        <TextField
          label="Team Name"
          variant="outlined"
          fullWidth
          value={newTeam}
          onChange={(e) => setNewTeam(e.target.value)}
          sx={{
            mt: 2,
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": { borderColor: "#ff85a2" },
              "&.Mui-focused fieldset": { borderColor: "#ff4d7a" },
            },
          }}
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
            textTransform: "none",
            transition: "0.3s",
            "&:hover": { backgroundColor: "#d81b60" },
          }}
          onClick={handleAddTeam}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Team"}
        </Button>
      </Paper>
    </Box>
  );
}
