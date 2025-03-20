import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Column = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#fce4ec", // Soft pastel pink
  borderRadius: "12px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  width: "80%",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "#ffebee",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#ffcdd2",
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff5f8", // Soft pastel background
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTeam, setNewTeam] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [open, setOpen] = useState(false);

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
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
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
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <Column elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Existing Teams
          </Typography>
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <Item key={index} elevation={3}>
                {team?.team_name ?? "No Name Available"}
              </Item>
            ))
          ) : (
            <Typography>No teams found.</Typography>
          )}
        </Column>
      </Grid>
      <Grid item xs={6}>
        <Column elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Add New Team
          </Typography>
          <TextField
            label="Team Name"
            variant="outlined"
            fullWidth
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: "8px" }}
          />
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#f48fb1",
              "&:hover": { backgroundColor: "#d81b60" },
            }}
            onClick={handleAddTeam}
            disabled={adding}
          >
            {adding ? "Adding..." : "Add Team"}
          </Button>
        </Column>
      </Grid>
    </Grid>
  );
}
