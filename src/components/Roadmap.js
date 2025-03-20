import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
} from "@mui/material";

dayjs.extend(utc); // Enable UTC handling

const fontStyle = {
  fontFamily: `"Poppins", sans-serif`,
};

function Roadmap() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(
          "❌ No token found in localStorage. User might not be logged in."
        );
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error.message);
      }
    }

    fetchTasks();
  }, []);

  // ✅ Extract unique task due dates (for roadmap tasks)
  const upcomingTasks = tasks
    .filter((task) => task.due_date && dayjs(task.due_date).isAfter(dayjs()))
    .sort((a, b) => dayjs(a.due_date).diff(dayjs(b.due_date))); // Sort by due date

  // ✅ Extract task creation dates for the calendar
  const taskDates = [
    ...new Set(
      tasks.map((task) => dayjs.utc(task.created_at).format("YYYY-MM-DD"))
    ),
  ];

  // ✅ Get tasks for the selected calendar date
  const tasksForSelectedDate = tasks.filter(
    (task) =>
      dayjs.utc(task.created_at).format("YYYY-MM-DD") ===
      selectedDate.format("YYYY-MM-DD")
  );

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "80vh",
        paddingTop: 2,
      }}
    >
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Left Side: Roadmap */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              height: "600px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              backgroundColor: "#edf5ff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", color: "#2b6cb0", mb: 2, ...fontStyle }}
            >
              Roadmap - Upcoming Tasks
            </Typography>

            <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
              {upcomingTasks.length > 0 ? (
                <ul
                  style={{
                    padding: "0 10px",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    ...fontStyle,
                  }}
                >
                  {upcomingTasks.map((task) => (
                    <li key={task.task_id} style={{ paddingBottom: "5px" }}>
                      <strong style={{ color: "#2b6cb0" }}>
                        {task.task_name}
                      </strong>
                      - Due on {dayjs(task.due_date).format("YYYY-MM-DD")}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    color: "#666",
                    fontStyle: "italic",
                    ...fontStyle,
                  }}
                >
                  No upcoming tasks.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Side: Calendar */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              height: "600px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              backgroundColor: "#fff5f8",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Calendar Section */}
                <Box sx={{ flexShrink: 0 }}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                  />
                </Box>
              </Box>
            </LocalizationProvider>

            <Divider sx={{ width: "100%", my: 2 }} />

            {/* Task List Section */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                width: "100%",
                maxHeight: "250px",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: "bold", color: "#d63384", ...fontStyle }}
              >
                Tasks on {selectedDate.format("YYYY-MM-DD")}
              </Typography>
              {tasksForSelectedDate.length > 0 ? (
                <ul
                  style={{
                    padding: "10px",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    ...fontStyle,
                  }}
                >
                  {tasksForSelectedDate.map((task) => (
                    <li key={task.task_id} style={{ paddingBottom: "5px" }}>
                      <strong style={{ color: "#b80d57" }}>
                        {task.task_name}
                      </strong>
                      - {task.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography
                  align="center"
                  sx={{
                    fontSize: "1.2rem",
                    color: "#666",
                    fontStyle: "italic",
                    ...fontStyle,
                  }}
                >
                  No tasks for this date.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Roadmap;
