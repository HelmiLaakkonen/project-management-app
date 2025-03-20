import { Route, Routes } from "react-router-dom";
import { Container, Box, Grid, Paper } from "@mui/material";
import Calender from "./Calender";
import Login from "./Login";
import Kanban from "./Kanban";

function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}

function DashboardContent() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 3,
        px: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          borderRadius: "12px",
          boxShadow: 3,
          backgroundColor: "#fff5f8",
          minHeight: "600px", // Ensures uniform height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: "stretch",
            justifyContent: "center",
            flexWrap: { xs: "wrap", md: "nowrap" }, // Stack on small screens, side-by-side on large
          }}
        >
          {/* Kanban Section */}
          <Grid item xs={12} md={7.5}>
            <Box sx={{ minHeight: "500px" }}>
              <Kanban />
            </Box>
          </Grid>

          {/* Calendar Section */}
          <Grid item xs={12} md={4.5}>
            <Box
              sx={{
                minHeight: "500px",
                overflow: "hidden",
              }}
            >
              <Calender />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

function Dashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <DashboardContent />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
    </Routes>
  );
}

export default Dashboard;
