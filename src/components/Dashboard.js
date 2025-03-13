import { Route, Routes } from "react-router-dom";
import { Container, Box, Grid2, Paper } from "@mui/material";
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
        <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}

function DashboardContent() {
  return (
    <Container
      maxWidth="xl" // Increased from "lg" to "xl" for better content fit
      sx={{ mt: 3, px: 1 }}
    >
      <Grid2 container spacing={2}>
        {/* LEFT SIDE: Kanban + Calendar inside one box */}
        <Grid2 item xs={12} md={8}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: "12px",
              boxShadow: 3,
              backgroundColor: "#fff5f8",
            }}
          >
            <Grid2 container spacing={1.5}>
              {/* Kanban Board - Now takes more space */}
              <Grid2 item xs={12} md={7}>
                <Box sx={{ minHeight: "500px" }}>
                  <Kanban />
                </Box>
              </Grid2>

              {/* Calendar - Given more space */}
              <Grid2 item xs={12} md={5}>
                <Box
                  sx={{
                    minHeight: "500px",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  <Calender />
                </Box>
              </Grid2>
            </Grid2>
          </Paper>
        </Grid2>

        {/* RIGHT SIDE: Task Roadmap (full height) */}
        <Grid2 item xs={12} md={4}>
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
        </Grid2>
      </Grid2>
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
