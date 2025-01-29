import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  // Fetch all marked dates on component mount
  useEffect(() => {
    async function fetchMarkedDates() {
      try {
        const response = await fetch("/api/calendar");
        const data = await response.json();
        setMarkedDates(data.markedDates.map((event) => event.date));
      } catch (error) {
        console.error("Error fetching marked dates:", error);
      }
    }

    fetchMarkedDates();
  }, []);

  // Fetch event details when a date is selected
  useEffect(() => {
    async function fetchEventDetails() {
      if (selectedDate) {
        try {
          const response = await fetch(`/api/calendar/${selectedDate}`);
          if (response.ok) {
            const data = await response.json();
            setEventDetails(data);
          } else {
            setEventDetails(null);
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      }
    }

    fetchEventDetails();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date ? date.format("YYYY-MM-DD") : null);
  };

  const isDateMarked = (date) =>
    markedDates.includes(date.format("YYYY-MM-DD"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex" }}>
        <DateCalendar
          value={selectedDate ? dayjs(selectedDate) : null}
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
        <div style={{ marginLeft: "20px", width: "300px" }}>
          <h3>Event Details</h3>
          {eventDetails ? (
            <div>
              <p>
                <strong>Date:</strong> {eventDetails.date}
              </p>
              <p>
                <strong>Description:</strong> {eventDetails.description}
              </p>
            </div>
          ) : (
            <p>No details for this date.</p>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default EventCalendar;
