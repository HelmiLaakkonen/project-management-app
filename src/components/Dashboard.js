import { Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Sidebar from './SideBar'; // Assuming you have a Sidebar component
import Calender from './Calender';
import Login from './Login';
import Kanban from "./Kanban";
import CssBaseline from "@mui/material/CssBaseline";

function Home() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Box sx={{ m: 2 }}>
          <Kanban />
        </Box>
      </Container>
    </>
  );
}

function Settings() {
  return (
    <Container>
      <Box>      <Calender />
      </Box>
    </Container>
  );
}

function Profile() {
  return (
    <Container>
      <h2>Profile</h2>
      <p>Update your profile information</p>
    </Container>
  );
}

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Main Content with Sidebar and Routes */}
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calender" element={<Calender />} />
          {/* <Route path="/user" element={<User />} /> */}
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
