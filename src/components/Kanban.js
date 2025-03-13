import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Grid2,
  Typography,
  Container,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Kanban() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    ready: [],
  });

  const [newTask, setNewTask] = useState({
    task_name: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/tasks"),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
        .then((response) => response.json())
        .then((data) => {
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
  };

  const handleAddTask = () => {
    if (!newTask.task_name) return;

    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTask, team_id: 1 }), // Set a default team_id
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks(); // Refresh tasks after adding
        setNewTask({ task_name: "", description: "", status: "pending" });
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;

    if (sourceColumn === destinationColumn) return;

    const movedTask = { ...tasks[sourceColumn][source.index] };
    const updatedTasks = { ...tasks };

    // Remove task from source column
    updatedTasks[sourceColumn] = [...updatedTasks[sourceColumn]];
    updatedTasks[sourceColumn].splice(source.index, 1);

    // Add task to destination column
    updatedTasks[destinationColumn] = [...updatedTasks[destinationColumn]];
    updatedTasks[destinationColumn].splice(destination.index, 0, movedTask);

    // Update task status
    const newStatus =
      destinationColumn === "todo"
        ? "pending"
        : destinationColumn === "inProgress"
        ? "in_progress"
        : "completed";

    movedTask.status = newStatus;
    setTasks(updatedTasks);

    // Automatically update database only when moving from "To Do" to "In Progress"
    if (sourceColumn === "todo" && destinationColumn === "inProgress") {
      fetch(`http://localhost:3000/api/tasks/${movedTask.task_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((response) => response.json())
        .then(() => {
          console.log(
            `✅ Task "${movedTask.task_name}" (ID: ${movedTask.task_id}) moved to In Progress and updated in DB!`
          );
          fetchTasks(); // Refresh tasks after update
        })
        .catch((error) =>
          console.error("❌ Error updating task status:", error)
        );
    }
  };

  const Item = styled(Paper)(({ status }) => ({
    backgroundColor:
      status === "pending"
        ? "#ffe9f0"
        : status === "in_progress"
        ? "#e8f7f8"
        : "#ecfbe8",
    padding: 8,
    textAlign: "center",
    color: "black",
    marginBottom: "8px",
  }));

  const Column = styled(Paper)(({ bgColor }) => ({
    backgroundColor: bgColor,
    padding: "16px",
    minHeight: "300px",
    width: "300px", // Ensure consistent width
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexGrow: 1,
        minHeight: "80vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 4, flexGrow: 1 }}
      >
        {/* Task Input Form */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            backgroundColor: "#fce4ec", // Soft pastel pink
            padding: 2,
            borderRadius: "12px", // Rounded corners
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow
            alignItems: "center",
          }}
        >
          <TextField
            label="Task Name"
            variant="outlined"
            value={newTask.task_name}
            onChange={(e) =>
              setNewTask({ ...newTask, task_name: e.target.value })
            }
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              backgroundColor: "#f48fb1", // Pastel pink button
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              textTransform: "none", // Makes text more readable
              "&:hover": {
                backgroundColor: "#d81b60", // Slightly darker pink on hover
              },
            }}
          >
            Add Task
          </Button>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid2 container spacing={4} justifyContent="center">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Grid2 item key={columnId}>
                <Column
                  elevation={3}
                  bgColor={
                    columnId === "todo"
                      ? "#f8d7da"
                      : columnId === "inProgress"
                      ? "#d1ecf1"
                      : "#d4edda"
                  }
                >
                  <Typography variant="h6" align="center" gutterBottom>
                    {columnId === "todo"
                      ? "To Do"
                      : columnId === "inProgress"
                      ? "In Progress"
                      : "Ready"}
                  </Typography>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {columnTasks.map((task, index) => (
                          <Draggable
                            key={task.task_id}
                            draggableId={String(task.task_id)}
                            index={index}
                          >
                            {(provided) => (
                              <Item
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                status={task.status} // Pass the status prop
                              >
                                {task.task_name}
                              </Item>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Column>
              </Grid2>
            ))}
          </Grid2>
        </DragDropContext>
      </Box>
    </Container>
  );
}

export default Kanban;
