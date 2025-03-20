import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [adding, setAdding] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [newMember, setNewMember] = useState("");
  const [addingMember, setAddingMember] = useState(false);

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

  const handleTeamClick = (teamId) => {
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
      setTeamMembers([]);
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/teams/${teamId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedTeam(teamId);
        setTeamMembers(data.members || []);
      })
      .catch((error) => console.error("Error fetching team members:", error));
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
        if (data.error) {
          throw new Error(data.error);
        }
        setTeams([...teams, data.team]);
        setNewTeam("");
        setAdding(false);
      })
      .catch((error) => {
        console.error("Error adding team:", error);
        setAdding(false);
      });
  };

  const handleDeleteTeam = () => {
    if (!teamToDelete) return;

    setDeleting(true);
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/teams/${teamToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete team");
        }
        return response.json();
      })
      .then(() => {
        setTeams(teams.filter((team) => team.team_id !== teamToDelete));
        setDeleteDialogOpen(false);
        setTeamToDelete(null);
        setDeleting(false);
        if (selectedTeam === teamToDelete) {
          setSelectedTeam(null);
          setTeamMembers([]);
        }
      })
      .catch((error) => {
        console.error("Error deleting team:", error);
        setDeleting(false);
      });
  };
  const handleAddMember = () => {
    if (!newMember.trim() || !selectedTeam) return;

    setAddingMember(true);
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/api/teams/${selectedTeam}/add-member`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newMember }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeamMembers([...teamMembers, { username: newMember }]);
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
          backgroundColor: "#fff5f8",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
            {teams.map((team) => (
              <Box key={team.team_id}>
                <Paper
                  elevation={3}
                  onClick={() => handleTeamClick(team.team_id)}
                  sx={{
                    padding: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GroupIcon sx={{ color: "#b80d57", marginRight: "10px" }} />
                    {team?.team_name ?? "No Name Available"}
                  </Box>
                  {/* Delete Button */}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setTeamToDelete(team.team_id);
                      setDeleteDialogOpen(true);
                    }}
                    sx={{ color: "#d81b60" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>

                {/* Show members if this team is selected */}
                {selectedTeam === team.team_id && (
                  <Box sx={{ pl: 3, mt: 1, mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "#b80d57" }}
                    >
                      Members:
                    </Typography>
                    {teamMembers.length > 0 ? (
                      teamMembers.map((member, index) => (
                        <Typography key={index} sx={{ color: "#333", pl: 2 }}>
                          - {member.username}
                        </Typography>
                      ))
                    ) : (
                      <Typography sx={{ color: "#666", pl: 2 }}>
                        No members found.
                      </Typography>
                    )}
                  </Box>
                )}
                {/* Add Member Section */}
                {selectedTeam === team.team_id && (
                  <Box sx={{ pl: 3, mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: "#b80d57" }}
                    >
                      Add Member:
                    </Typography>
                    <TextField
                      label="Username"
                      variant="outlined"
                      size="small"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      sx={{
                        mt: 1,
                        backgroundColor: "white",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        ml: 1,
                        mt: 1,
                        backgroundColor: "#f48fb1",
                        color: "white",
                      }}
                      onClick={handleAddMember}
                      disabled={addingMember}
                    >
                      {addingMember ? "Adding..." : "Add"}
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "#666", textAlign: "center" }}>
            No teams found.
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Add New Team Section */}
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
          }}
          onClick={handleAddTeam}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Team"}
        </Button>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Team</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this team? This action is
              permanent.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteTeam}
              color="error"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
