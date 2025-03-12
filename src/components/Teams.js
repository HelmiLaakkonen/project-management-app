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
  backgroundColor: "#f5f5f5",
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
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
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
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          setTeams([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchTeamMembers = (teamId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/teams/${teamId}/members`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Team Members:", data); // Debugging
        if (data && Array.isArray(data.members)) {
          setTeamMembers(data.members);
        } else {
          setTeamMembers([]); // Ensure empty state if no members found
        }
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
        setTeamMembers([]); // Handle error state
      });
  };

  const handleDeleteTeam = () => {
    if (!selectedTeam) return;
  
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:3000/api/teams/${selectedTeam.team_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeams((prevTeams) =>
            prevTeams.filter((team) => team.team_id !== selectedTeam.team_id)
          );
          handleClose(); // Close modal after deletion
        } else {
          console.error("Failed to delete team:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };
  
  

  const handleAddTeam = () => {
    if (!newTeam.trim()) return;
    setAdding(true);
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/teams", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_name: newTeam }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.team) {
          setTeams((prevTeams) => [...prevTeams, data.team]);
        }
        setNewTeam("");
        setAdding(false);
      })
      .catch((error) => {
        console.error("Error adding team:", error);
        setAdding(false);
      });
  };

  const handleOpen = (team) => {
    setSelectedTeam(team);
    fetchTeamMembers(team.team_id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeam(null);
    setTeamMembers([]);
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <Column elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Existing Teams
          </Typography>
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <Item key={index} elevation={3} onClick={() => handleOpen(team)}>
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
            style={{ marginTop: "16px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTeam}
            disabled={adding}
            style={{ marginTop: "8px" }}
          >
            {adding ? "Adding..." : "Add Team"}
          </Button>
        </Column>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Members of {selectedTeam?.team_name}
          </Typography>
          {teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <Typography key={index}>{member.username}</Typography>
            ))
          ) : (
            <Typography>No members found.</Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteTeam}
            style={{ marginTop: "16px" }}
          >
          Delete Team
          </Button>
          <Button onClick={handleClose} style={{ marginTop: "16px" }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
