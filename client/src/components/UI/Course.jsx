import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import API from "../../../utils/api";

const Course = ({ selectCourse, setSelectCourse, mode = "dashboard" }) => {
  const [newCourse, setNewCourse] = useState("");
  const [courseList, setCourseList] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourseList(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSelect = (course, popupState) => {
    setSelectCourse(course);
    popupState.close();
  };

  const handleAddCourse = async () => {
    if (!newCourse) return;
    try {
      await API.post("/courses", {
        courseName: newCourse,
        courseDates: ["TBD"],
      });
      setNewCourse("");
      fetchCourses();
    } catch (err) {
      console.error("Add course error:", err);
    }
  };

  return (
    <Stack spacing={3} width="100%" alignItems="center">
      {mode === "dashboard" && (
        <PopupState variant="popover" popupId="course-menu">
          {(popupState) => (
            <>
              <Button
                color="primary"
                variant="contained"
                {...bindTrigger(popupState)}
                fullWidth
              >
                {selectCourse ? `Course: ${selectCourse.courseName}` : "Select Course"}
              </Button>

              <Menu {...bindMenu(popupState)}>
                {courseList.map((course) => (
                  <MenuItem
                    key={course._id}
                    onClick={() => handleSelect(course, popupState)}
                  >
                    {course.courseName}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </PopupState>
      )}

      <Typography>Or create a new course</Typography>

      <Stack direction="row" spacing={2} width="100%" justifyContent="center">
        <TextField
          label="New Course Name"
          variant="outlined"
          value={newCourse}
          onChange={(e) => {
            setNewCourse(e.target.value)}}
          sx={{ flex: 1 }}
        />
        <Button color="primary" variant="outlined" onClick={handleAddCourse}>
          Add
        </Button>
        </Stack>

<Typography sx={{ mt: 1 }}>
  You selected: <strong>{newCourse ? newCourse : selectCourse ? selectCourse.courseName : "None"}</strong>
</Typography>

</Stack>
  )}

export default Course;
