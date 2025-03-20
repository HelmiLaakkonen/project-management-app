import { useState, useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Modal, Paper, Divider } from "@mui/material";
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
  borderRadius: "16px", 
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  width: "80%",
  textAlign: "center",
  cursor: "pointer",
  borderRadius: "8px", 
  transition: "all 0.3s ease", 
  "&:hover": {
    backgroundColor: "#fce4ec", 
  },
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
  borderRadius: "16px", 
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
  const [teamCreator, setTeamCreator] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [addingMember, setAddingMember] = useState(false);

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
        setTeamMembers(data.members || []);
        setTeamCreator(data.created_by);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
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
        if (data.error) {
          alert(data.error); 
        } else {
          alert("Team deleted successfully!");
          fetchTeams();
          handleClose();
        }
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
      });
  };

  const handleAddMember = () => {
    if (!newMember.trim() || !selectedTeam) return;

    setAddingMember(true);
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/teams/${selectedTeam.team_id}/add-member`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newMember }), 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeamMembers((prevMembers) => [...prevMembers, { username: newMember }]);
          setNewMember(""); 
        } else {
          console.error("Error adding member:", data.error);
        }
        setAddingMember(false);
      })
      .catch((error) => {
        console.error("Error adding member:", error);
        setAddingMember(false);
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
    <Box sx={{ display: "flex", justifyContent: "center", minHeight: "80vh", mt: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={6}>
          <Column elevation={3}>
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#d63384" }}>
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
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#d63384" }}>
              Add New Team
            </Typography>
            <TextField
              label="Team Name"
              variant="outlined"
              fullWidth
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              sx={{
                marginTop: 2,
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTeam}
              disabled={adding}
              sx={{
                marginTop: 2,
                backgroundColor: "#f48fb1",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#d81b60" },
              }}
            >
              {adding ? "Adding..." : "Add Team"}
            </Button>
          </Column>
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#d63384" }}>
            Members of {selectedTeam?.team_name}
          </Typography>
          {teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <Typography key={index}>{member.username}</Typography>
            ))
          ) : (
            <Typography>No members found.</Typography>
          )}
          <TextField
            label="Enter Username"
            variant="outlined"
            fullWidth
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            sx={{
              marginTop: 2,
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMember}
            disabled={addingMember}
            sx={{
              marginTop: 2,
              backgroundColor: "#f48fb1",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#d81b60" },
            }}
          >
            {addingMember ? "Adding..." : "Add Member"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteTeam}
            sx={{
              marginTop: 3,
              backgroundColor: "#ff6961",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Delete team
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              marginTop: 2,
              color: "primary.main",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
s