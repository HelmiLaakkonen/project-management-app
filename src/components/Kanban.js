import React, { useEffect, useState, useCallback } from "react";
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

  const fetchTasks = useCallback(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const groupedTasks = {
          todo: (data.tasks || []).filter((task) => task.status === "pending"),
          inProgress: (data.tasks || []).filter(
            (task) => task.status === "in_progress"
          ),
          ready: (data.tasks || []).filter(
            (task) => task.status === "completed"
          ),
        };

        setTasks({ ...groupedTasks }); // Update the state
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add new task
  const handleAddTask = () => {
    if (!newTask.task_name) return;
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks(); // Refresh tasks after adding
        setNewTask({
          task_name: "",
          description: "",
          status: "pending",
          team_name: "",
          due_date: "",
        });
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Handle drag-and-drop movement of tasks
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

    // Update status in the database
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/tasks/${movedTask.task_id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        console.log(
          `✅ Task "${movedTask.task_name}" moved to ${newStatus} and updated in DB!`
        );
        fetchTasks(); // Refresh tasks after update
      })
      .catch((error) => console.error("❌ Error updating task status:", error));
  };

  // Styling (More Compact)
  const Item = styled(Paper)(({ status }) => ({
    backgroundColor:
      status === "pending"
        ? "#ffe9f0"
        : status === "in_progress"
        ? "#e8f7f8"
        : "#ecfbe8",
    padding: "6px", // Reduced padding
    fontSize: "0.9rem", // Smaller text
    textAlign: "center",
    color: "black",
    marginBottom: "6px", // Tighter spacing between tasks
  }));

  const Column = styled(Paper)(({ bgColor }) => ({
    backgroundColor: bgColor,
    padding: "12px", // Less padding to save space
    minHeight: "280px", // Reduced height to fit better
    width: "240px", // Compact width (previously 300px)
    borderRadius: "8px", // Slightly smaller border
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
        sx={{ display: "flex", flexDirection: "column", gap: 3, flexGrow: 1 }}
      >
        {/* Task Input Form */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            backgroundColor: "#fce4ec",
            padding: 2,
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
            }}
          />
          <TextField
            label="Team Name"
            variant="outlined"
            value={newTask.team_name}
            onChange={(e) =>
              setNewTask({ ...newTask, team_name: e.target.value })
            }
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
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
            }}
          />
          <TextField
            label="Due date"
            type="Date"
            variant="outlined"
            value={newTask.due_date}
            onChange={(e) =>
              setNewTask({ ...newTask, due_date: e.target.value })
            }
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              backgroundColor: "#f48fb1",
              color: "white",
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#d81b60",
              },
            }}
          >
            Add Task
          </Button>
        </Box>

        {/* Drag & Drop Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid2 container spacing={3} justifyContent="center">
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
                                status={task.status}
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
