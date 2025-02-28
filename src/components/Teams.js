import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
}));

export default function TeamsList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/teams")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // Debugging log
        if (data && Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          setTeams([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Column elevation={3}>
          <Typography variant="h6" align="center" gutterBottom>
            Teams
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
    </Grid>
  );
}
