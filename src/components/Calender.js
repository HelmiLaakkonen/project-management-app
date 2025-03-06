import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Container, Box, Typography, Paper, Divider } from "@mui/material";

dayjs.extend(utc); // Enable UTC handling

// Load custom Google Font
const fontStyle = {
  fontFamily: `"Poppins", sans-serif`, // Elegant, rounded font
};

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
    const taskDate = dayjs.utc(task.created_at).format("YYYY-MM-DD"); // Now filtering by created_at
    const selectedFormatted = selectedDate.format("YYYY-MM-DD");
    return taskDate === selectedFormatted;
  });

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "80vh",
        paddingTop: 2,
        mt: -5,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: "700px", // Increased width slightly
          height: "680px", // Slightly taller for better balance
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px", // Rounded edges
          backgroundColor: "#fff5f8", // Soft pastel pink background
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft elegant shadow
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            {/* Calendar Section */}
            <Box sx={{ flexShrink: 0 }}>
              <DateCalendar
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                sx={{
                  "& .MuiPickersDay-root": {
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#333", // Darker for better contrast
                    fontFamily: `"Poppins", sans-serif`,
                  },
                  "& .MuiPickersDay-today": {
                    backgroundColor: "#ffb6c1", // Light pink for today's date
                    color: "white",
                  },
                  "& .MuiPickersDay-selected": {
                    backgroundColor: "#ff85a2 !important", // More vibrant pink for selection
                  },
                }}
              />
            </Box>

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
                      </strong>{" "}
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
          </Box>
        </LocalizationProvider>
      </Paper>
    </Container>
  );
}

export default Calendar;
