import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../../../utils/api";

function UpcomingAssignments({ assignments = [], userCourseId }) {
  const [assignmentList, setAssignmentList] = useState([]);
  const [checkedAssignments, setCheckedAssignments] = useState([]);
  const [form, setForm] = useState({ title: "", dueDate: "", lesson: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!userCourseId) {
      setAssignmentList([]);
      return;
    }

    const filtered = assignments.filter((item) => {
      if (typeof item.courseID === "object") {
        return item.courseID._id === userCourseId;
      }
      return item.courseID === userCourseId;
    });

    setAssignmentList(filtered);
    setCheckedAssignments([]);
  }, [assignments, userCourseId]);

  function toggleChecked(id) {
    if (checkedAssignments.includes(id)) {
      setCheckedAssignments(checkedAssignments.filter((item) => item !== id));
    } else {
      setCheckedAssignments([...checkedAssignments, id]);
    }
  }

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title || !form.dueDate || !form.lesson) {
      alert("Please fill out all fields.");
      return;
    }

    const token = localStorage.getItem("token");

    if (editingId) {
      API.patch(
        `/assignments/${editingId}`,
        {
          title: form.title,
          dueDate: form.dueDate,
          lesson: form.lesson,
          courseID: userCourseId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then(() => {
          alert("Assignment updated!");
          window.location.reload();
        })
        .catch((err) => alert("Error: " + err.message));
} else {
  console.log('Sending assignment:', {
    title: form.title,
    dueDate: form.dueDate,
    lesson: form.lesson,
    courseID: userCourseId,
  });
  console.log("Submitting assignment with courseID:", userCourseId);

  API.post(
    "/assignments",
    {
      title: form.title,
      dueDate: form.dueDate,
      lesson: form.lesson,
      courseID: userCourseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  .then(() => {
    alert("Assignment created!");
    window.location.reload();
  })
  .catch((err) => alert("Error: " + err.message));
}
    setForm({ title: "", dueDate: "", lesson: "" });
    setEditingId(null);
  }

  function handleEdit(item) {
    setForm({
      title: item.title,
      dueDate: item.dueDate.slice(0, 10),
      lesson: item.lesson.toString(),
    });
    setEditingId(item._id);
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    API.delete(`/assignments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert("Deleted!");
        window.location.reload();
      })
      .catch((err) => alert("Error: " + err.message));
  }

  if (!userCourseId) {
    return <Typography color="error">User course ID is missing.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {editingId ? "Edit Assignment" : "New Assignment"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Lesson Number"
          name="lesson"
          type="number"
          value={form.lesson}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <Button variant="contained" type="submit">
            {editingId ? "Update" : "Create"}
          </Button>
          {editingId && (
            <Button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setForm({ title: "", dueDate: "", lesson: "" });
                setEditingId(null);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <Typography variant="h6">Upcoming Assignments</Typography>

      {assignmentList.length === 0 ? (
        <Typography>No assignments yet.</Typography>
      ) : (
        <List>
          {assignmentList.map((item) => (
            <ListItem
              key={item._id}
              onClick={() => toggleChecked(item._id)}
              style={{ cursor: "pointer" }}
              secondaryAction={
                <>
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkedAssignments.includes(item._id)}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={`Due: ${new Date(item.dueDate).toLocaleDateString()} - Lesson: ${item.lesson}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default UpcomingAssignments;
