import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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

    console.log(
      `Comparing: Task(${taskDate}) === Selected(${selectedFormatted})`
    );
    return taskDate === selectedFormatted;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "20px" }}>
        <DateCalendar
          value={selectedDate}
          onChange={(date) => {
            console.log("Selected date:", date.format("YYYY-MM-DD"));
            setSelectedDate(date);
          }}
        />

        <div style={{ flex: 1 }}>
          <h3>Tasks on {selectedDate.format("YYYY-MM-DD")}</h3>
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

export default Calendar;
