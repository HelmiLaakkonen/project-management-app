import { Route, Routes } from "react-router-dom";
import { Container, Box } from "@mui/material";
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
        {/* Added overflow: hidden */}
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

function Home() {
  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <Kanban />
      </Box>
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
            <Home />
          </Layout>
        }
      />
      <Route
        path="/calender"
        element={
          <Layout>
            <Calender />
          </Layout>
        }
      />
      <Route
        path="/roadmap"
        element={
          <Layout>
            <Roadmap />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Dashboard;
