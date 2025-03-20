import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Container, Box, Typography, Paper, Divider } from "@mui/material";

dayjs.extend(utc); // Enable UTC handling

const fontStyle = {
  fontFamily: `"Poppins", sans-serif`, // Elegant, rounded font
};

// 🔹 Custom Day Component to Show Dots for Task Days
function CustomDay(props) {
  const { day, tasks, ...other } = props;
  const formattedDate = day.format("YYYY-MM-DD");

  // ✅ Check if this day has tasks
  const hasTask = tasks.includes(formattedDate);

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        position: "relative",
        fontWeight: "600",
        color: "#333",
        fontFamily: `"Poppins", sans-serif`,
        "&::after": hasTask
          ? {
              content: '""',
              position: "absolute",
              bottom: "4px",
              left: "50%",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#d63384",
            }
          : {},
      }}
    />
  );
}

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // ✅ Extract only unique task creation dates
  const taskDates = [
    ...new Set(
      tasks.map((task) => dayjs.utc(task.created_at).format("YYYY-MM-DD"))
    ),
  ];

  // ✅ Filter tasks for the currently selected date
  const tasksForSelectedDate = tasks.filter(
    (task) =>
      dayjs.utc(task.created_at).format("YYYY-MM-DD") ===
      selectedDate.format("YYYY-MM-DD")
  );

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
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: "500px",
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
                renderDay={(day, selectedDays, pickersProps) => (
                  <CustomDay {...pickersProps} day={day} tasks={taskDates} />
                )}
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
                  <strong style={{ color: "#b80d57" }}>{task.task_name}</strong>{" "}
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
    </Container>
  );
}

export default Calendar;
