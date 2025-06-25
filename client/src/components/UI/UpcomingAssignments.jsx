import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const UpcomingAssignments = ({ assignments = [], userCourseId }) => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);

useEffect(() => {
  if (!userCourseId) {
    setFilteredAssignments([]);
    return;
  }

const filtered = assignments.filter(
  (assignment) =>
    assignment.courseID === userCourseId
);

  setFilteredAssignments(filtered);
}, [assignments, userCourseId]);

  if (!userCourseId) {
    return <Typography color="error">User course ID is missing.</Typography>;
  }

  if (filteredAssignments.length === 0) {
    return <Typography>No upcoming assignments.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Upcoming Assignments
      </Typography>
      <List>
        {filteredAssignments.map(({ _id, title, dueDate, lesson }) => (
          <ListItem key={_id}>
            <ListItemText
              primary={title}
              secondary={`Due: ${new Date(dueDate).toLocaleDateString()} - Lesson: ${lesson}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UpcomingAssignments;
