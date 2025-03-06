import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Grid,
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
    fetch("http://localhost:3000/api/tasks")
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

    const movedTask = tasks[sourceColumn][source.index];
    const newSourceTasks = Array.from(tasks[sourceColumn]);
    newSourceTasks.splice(source.index, 1);
    const newDestinationTasks = Array.from(tasks[destinationColumn]);
    newDestinationTasks.splice(destination.index, 0, movedTask);

    // Update the status of the moved task
    movedTask.status =
      destinationColumn === "todo"
        ? "pending"
        : destinationColumn === "inProgress"
        ? "in_progress"
        : "completed";

    setTasks({
      ...tasks,
      [sourceColumn]: newSourceTasks,
      [destinationColumn]: newDestinationTasks,
    });

    fetch(`http://localhost:3000/api/tasks/${movedTask.task_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: movedTask.status }),
    }).catch((error) => console.error("Error updating task status:", error));
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
        overflow: "hidden", // Prevents unnecessary scrolling
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 4, flexGrow: 1 }}
      >
        {/* Task Input Form */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Task Name"
            variant="outlined"
            value={newTask.task_name}
            onChange={(e) =>
              setNewTask({ ...newTask, task_name: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAddTask}>
            Add Task
          </Button>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Grid container spacing={4} justifyContent="center">
            {Object.entries(tasks).map(([columnId, columnTasks]) => (
              <Grid item key={columnId}>
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
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>
    </Container>
  );
}

export default Kanban;