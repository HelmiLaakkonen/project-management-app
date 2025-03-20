import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import dayjs from "dayjs";

function Roadmap() {
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
        console.log("Fetched Tasks:", data.tasks);
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  console.log("Roadmap Component Loaded");

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        textAlign: "center",
        backgroundColor: "#fff5f8",
        borderRadius: "12px",
        maxWidth: "500px", // Set a limited width for a vertical layout
        margin: "auto", // Center the roadmap
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Task Roadmap
      </Typography>

      {tasks.length > 0 ? (
        <Timeline position="alternate">
          {tasks.map((task, index) => (
            <TimelineItem key={task.task_id}>
              <TimelineSeparator>
                <TimelineDot
                  color={index % 2 === 0 ? "primary" : "secondary"}
                />
                {index !== tasks.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#d63384" }}
                >
                  {task.task_name}
                </Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  <strong>Start:</strong>{" "}
                  {dayjs(task.created_at).format("MMM D, YYYY")} <br />
                  <strong>Due:</strong>{" "}
                  {task.due_date
                    ? dayjs(task.due_date).format("MMM D, YYYY")
                    : "No due date"}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <Typography variant="body1" sx={{ color: "#666" }}>
          No tasks available.
        </Typography>
      )}
    </Paper>
  );
}

export default Roadmap;
