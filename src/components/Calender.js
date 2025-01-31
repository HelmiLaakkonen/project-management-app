import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";

const hardcodedTasks = [
  {
    task_id: 1,
    team_id: 1,
    task_name: "Set Up Backend API",
    description: "Create REST API endpoints for tasks",
    due_date: "2025-01-30T18:00:00.000Z",
    status: "completed",
    created_at: "2025-01-25T14:30:00.000Z",
  },
  {
    task_id: 2,
    team_id: 1,
    task_name: "Finish Calendar Feature",
    description: "Implement calendar component in frontend",
    due_date: "2025-01-31T22:00:00.000Z",
    status: "pending",
    created_at: "2025-01-29T10:10:13.000Z",
  },
  {
    task_id: 3,
    team_id: 2,
    task_name: "Fix Role Assignment Bug",
    description: "Debug and fix role assignment logic in Discord bot",
    due_date: "2025-02-02T12:00:00.000Z",
    status: "in-progress",
    created_at: "2025-01-28T08:45:30.000Z",
  },
  {
    task_id: 4,
    team_id: 3,
    task_name: "Optimize Database Queries",
    description: "Improve performance of MySQL queries",
    due_date: "2025-02-05T16:30:00.000Z",
    status: "pending",
    created_at: "2025-01-27T17:20:00.000Z",
  },
];

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState(new Set());

  useEffect(() => {
    // Directly set hardcoded tasks
    setTasks(hardcodedTasks);

    // Extract due dates and store them in a Set for quick lookup
    const taskDates = new Set(
      hardcodedTasks.map((task) => dayjs(task.due_date).format("YYYY-MM-DD"))
    );
    setMarkedDates(taskDates);
  }, []);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter tasks for selected date
  const tasksForSelectedDate = tasks.filter(
    (task) =>
      dayjs(task.due_date).format("YYYY-MM-DD") ===
      selectedDate?.format("YYYY-MM-DD")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "20px" }}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          slots={{
            day: (props) => <CustomDay {...props} markedDates={markedDates} />,
          }}
        />
        <div style={{ flex: 1 }}>
          <h3>Tasks on {selectedDate?.format("YYYY-MM-DD") || "..."}</h3>
          {tasksForSelectedDate.length > 0 ? (
            <ul>
              {tasksForSelectedDate.map((task) => (
                <li key={task.task_id}>
                  <strong>{task.task_name}</strong> - {task.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this date.</p>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

// Custom Day Component to Highlight Dates with Tasks
function CustomDay(props) {
  const { day, markedDates, ...other } = props;
  const formattedDate = day.format("YYYY-MM-DD");
  const isMarked = markedDates.has(formattedDate);

  return (
    <Badge overlap="circular" badgeContent={isMarked ? "🔴" : null}>
      <PickersDay {...other} day={day} />
    </Badge>
  );
}

export default Calendar;
