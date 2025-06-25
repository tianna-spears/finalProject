import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";

const UpcomingAssignments = ({ assignments = [], userCourseId }) => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [checked, setChecked] = useState([]);

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
  setChecked([]);
}, [assignments, userCourseId]);

const handleToggle = (id) => () => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
          <ListItem 
          key={_id}
            disablePadding
            secondaryAction={null}
            onClick={handleToggle(_id)}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(_id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
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
