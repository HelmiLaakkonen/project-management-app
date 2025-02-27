import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Container, Box, Typography, Paper } from "@mui/material";

dayjs.extend(utc); // Enable UTC handling

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        const data = await response.json();
        console.log("Fetched Tasks:", data.tasks);
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // Filter tasks for selected date using UTC comparison
  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDate = dayjs.utc(task.due_date).format("YYYY-MM-DD"); // Treat as UTC
    const selectedFormatted = selectedDate.format("YYYY-MM-DD"); // Local date for user selection

    return taskDate === selectedFormatted;
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh", // Keeps it centered
        paddingTop: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 3, width: "100%", maxWidth: "500px" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <DateCalendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />

            <Box sx={{ width: "100%" }}>
              <Typography variant="h6" align="center">
                Tasks on {selectedDate.format("YYYY-MM-DD")}
              </Typography>
              {tasksForSelectedDate.length > 0 ? (
                <ul>
                  {tasksForSelectedDate.map((task) => (
                    <li key={task.task_id}>
                      <strong>{task.task_name}</strong> - {task.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography align="center">No tasks for this date.</Typography>
              )}
            </Box>
          </Box>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
}

export default Calendar;
