import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
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
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        const data = await response.json();
        console.log("Fetched Tasks:", data.tasks); // ✅ Check if data is received
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
        marginTop: 3,
        textAlign: "center",
        backgroundColor: "#fff5f8",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Task Roadmap
      </Typography>

      {tasks.length > 0 ? (
        <Timeline position="right">
          {tasks.map((task) => (
            <TimelineItem key={task.task_id}>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
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
