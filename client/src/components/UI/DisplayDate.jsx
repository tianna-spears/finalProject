import React from "react";
import Typography from "@mui/material/Typography";

const DateDisplay = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Typography variant="h6" sx={{ mt: 2 }}>
      Today's Date is: <strong>{today}</strong>
    </Typography>
  );
};

export default DateDisplay;
