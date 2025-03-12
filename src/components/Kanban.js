import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid2, Typography, Box } from "@mui/material";

function Kanban() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    ready: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Fetch tasks from the API
    fetch("http://localhost:3000/api/tasks", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Group tasks based on status
        const groupedTasks = {
          todo: data.tasks.filter((task) => task.status === "pending"),
          inProgress: data.tasks.filter(
            (task) => task.status === "in_progress"
          ),
          ready: data.tasks.filter((task) => task.status === "completed"),
        };
        setTasks(groupedTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Styling
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 8,
    textAlign: "center",
    color: "black",
    marginBottom: "8px",
  }));

  const Column = styled(Paper)(({ bgColor }) => ({
    backgroundColor: bgColor,
    padding: "16px",
    minHeight: "300px",
  }));

  // Kanban main content
  return (
    <Grid2 container spacing={4}>
      {/* TO DO COLUMN */}
      <Grid2 item xs={4}>
        <Column elevation={3} bgColor="#f8d7da">
          <Typography variant="h6" align="center" gutterBottom>
            To Do
          </Typography>
          {tasks.todo.map((task) => (
            <Item key={task.task_id} elevation={3}>
              {task.task_name}
            </Item>
          ))}
        </Column>
      </Grid2>

      {/* IN PROGRESS COLUMN */}
      <Grid2 item xs={4}>
        <Column elevation={3} bgColor="#d1ecf1">
          <Typography variant="h6" align="center" gutterBottom>
            In Progress
          </Typography>
          {tasks.inProgress.map((task) => (
            <Item key={task.task_id} elevation={3}>
              {task.task_name}
            </Item>
          ))}
        </Column>
      </Grid2>

      {/* READY COLUMN */}
      <Grid2 item xs={4}>
        <Column elevation={3} bgColor="#d4edda">
          <Typography variant="h6" align="center" gutterBottom>
            Ready
          </Typography>
          {tasks.ready.map((task) => (
            <Item key={task.task_id} elevation={3}>
              {task.task_name}
            </Item>
          ))}
        </Column>
      </Grid2>
    </Grid2>
  );
}

export default Kanban;
