import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);

  // Fetch tasks from backend
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data.tasks);

        // Extract due dates for marking on calendar
        const taskDates = data.tasks.map((task) => task.due_date);
        setMarkedDates(taskDates);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Filter tasks for selected date
  const tasksForSelectedDate = tasks.filter(
    (task) => task.due_date === selectedDate?.format("YYYY-MM-DD")
  );

  // Highlight marked dates
  const isDateMarked = (date) =>
    markedDates.includes(date.format("YYYY-MM-DD"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "20px" }}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          renderDay={(day, _value, DayComponentProps) => (
            <div style={{ position: "relative" }}>
              <DayComponentProps.Day {...DayComponentProps} />
              {isDateMarked(day) && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: "red",
                  }}
                />
              )}
            </div>
          )}
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

export default Calendar;
