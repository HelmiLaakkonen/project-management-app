import React from "react";
import { Container, Grid2, Typography, Box } from "@mui/material";
import Profile from "./Profile";
import TeamsList from "./Teams";

export default function UserDashboard() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        paddingTop: 2,
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          width: "100%",
          alignItems: "stretch", // Ensures both sections stretch equally
          flexWrap: "nowrap", // Prevents wrapping
        }}
      >
        {/* Profile Section (Left) */}
        <Grid2
          item
          xs={12}
          md={6.8}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "100%", // Forces same height as Teams
            }}
          >
            <Profile />
          </Box>
        </Grid2>

        {/* Teams Section (Right) - No Background Card */}
        <Grid2
          item
          xs={12}
          md={3.2}
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TeamsList />
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
