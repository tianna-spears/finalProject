import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date(2025, 5, 25));

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        activeStartDate={new Date(2025, 5, 24)}
        minDate={new Date(2025, 5, 24)}
        maxDate={new Date(2025, 11, 31)}
      />
    </div>
  );
};

export default MyCalendar;
