import { Route, Routes } from "react-router-dom";
import { Container, Box, Grid, Paper } from "@mui/material";
import Calender from "./Calender";
import Login from "./Login";
import Kanban from "./Kanban";
import Roadmap from "./Roadmap";

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
        <Box
          sx={{
            flexGrow: 1,
            padding: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

function DashboardContent() {
  return (
    <Container
      maxWidth="lg" // Keeps layout centered
      sx={{ mt: 3, px: 1 }} // Reduced side padding
    >
      <Grid container spacing={2}>
        {/* LEFT SIDE: Kanban + Calendar inside one box */}
        <Grid item xs={12} md={9}>
          {" "}
          {/* Increased width for better fit */}
          <Paper
            sx={{
              padding: 2,
              borderRadius: "12px",
              boxShadow: 3,
              backgroundColor: "#fff5f8",
            }}
          >
            <Grid container spacing={1.5}>
              {/* Kanban Board - Shifted left by reducing width */}
              <Grid item xs={12} md={6}>
                {/* Reduced from 8 to 6 */}
                <Box sx={{ minHeight: "500px" }}>
                  <Kanban />
                </Box>
              </Grid>

              {/* Calendar - Given more space */}
              <Grid item xs={12} md={6}>
                {/* Increased width */}
                <Box
                  sx={{
                    minHeight: "500px",
                    maxWidth: "100%", // Prevents overflow
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Calender />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* RIGHT SIDE: Task Roadmap (full height) */}
        <Grid item xs={12} md={3}>
          {/* Reduced width */}
          <Paper
            sx={{
              padding: 2,
              borderRadius: "12px",
              boxShadow: 3,
              backgroundColor: "#fff5f8",
              minHeight: "100%",
            }}
          >
            <Roadmap />
          </Paper>
        </Grid>
      </Grid>
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
