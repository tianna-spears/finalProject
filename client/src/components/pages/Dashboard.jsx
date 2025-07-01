import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import UpcomingAssignments from "../UI/UpcomingAssignments";
import MentorSession from "../UI/MentorSession";
import StudyCalendar from "../UI/StudyCalendar";
import DisplayDate from "../UI/DisplayDate";
import QuotesAPI from "../UI/QuotesAPI";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectCourse, setSelectCourse] = useState(null);  
  const [updatedName, setUpdatedName] = useState("");

  const [courseList, setCourseList] = useState([]);      
  const [selectedEnrollmentCourseId, setSelectedEnrollmentCourseId] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User from API:", res.data.user); 

        setUser(res.data.user);
        setAssignments(res.data.assignments);
        setLoading(false);

        if (res.data.user.courseId) {
          setSelectCourse({
            _id: res.data.user.courseId,
            courseName: res.data.user.courseName,
          });
          setUpdatedName(res.data.user.courseName);
          setSelectedEnrollmentCourseId(res.data.user.courseId);
        }
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        setCourseList(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchDashboard();
    fetchCourses();
  }, []);

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setAssignments(res.data.assignments);
      if (res.data.user.courseId) {
        setSelectCourse({
          _id: res.data.user.courseId,
          courseName: res.data.user.courseName,
        });
        setUpdatedName(res.data.user.courseName);
        setSelectedEnrollmentCourseId(res.data.user.courseId);
      } else {
        setSelectCourse(null);
        setUpdatedName("");
        setSelectedEnrollmentCourseId("");
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  };

const handleUpdateCourse = async () => {
  if (!selectCourse || !updatedName) return;

  try {
    const token = localStorage.getItem("token");
    const coursesRes = await API.get("/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const foundCourse = coursesRes.data.find(
      (course) => course.courseName.toLowerCase() === updatedName.toLowerCase()
    );

    if (!foundCourse) {
      alert("Course not found. Please enter a valid course name.");
      return;
    }

    await API.patch(`/courses/user/${user._id}`, {
      courseID: foundCourse._id,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await refreshUser();
    alert("Enrolled course updated!");
  } catch (err) {
    console.error("Update user course error:", err);
    alert("Failed to update enrolled course.");
  }
};

  const handleDeleteCourse = async () => {
    if (!selectCourse) return;
    try {
      await API.delete(`/courses/${selectCourse._id}`);
      setSelectCourse(null);
      setUpdatedName("");
      await refreshUser();
      alert("Course deleted!");
    } catch (err) {
      console.error("Delete course error:", err);
    }
  };

  const handleUpdateUserEnrollment = async () => {
    if (!selectedEnrollmentCourseId) return;
    try {
      const token = localStorage.getItem("token");
      console.log("user._id:", user?._id);

      await API.patch(`/courses/user/${user._id}`, { courseID: selectedEnrollmentCourseId }, {
        headers: { Authorization: `Bearer ${token}` },
        
      });
      alert("Updated course!");
      await refreshUser();
    } catch (err) {
      console.error("Failed to update user enrollment:", err);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (!user) return <div>Error loading user data.</div>;

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Welcome, {user.name ? user.name : "N/A"}!
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Enrolled in: <strong>{user.courseName ? user.courseName : "N/A"}</strong>
      </Typography>

      <Stack spacing={2} width="100%" maxWidth={400} margin="auto" my={4} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          Change Enrolled Course
        </Typography>

        <TextField
          select
          label="Select Course"
          value={selectedEnrollmentCourseId}
          onChange={(e) => setSelectedEnrollmentCourseId(e.target.value)}
          SelectProps={{ native: true }}
          fullWidth
        >
          <option value="">-- Select Course --</option>
          {courseList.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseName}
            </option>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleUpdateUserEnrollment}
          disabled={!selectedEnrollmentCourseId}
        >
          Save Enrollment
        </Button>
      </Stack>

      {selectCourse && (
        <Stack spacing={2} width="100%" maxWidth={400} alignItems="center" margin="auto" my={4}>
          <Typography variant="body2" color="textSecondary">
            Selected Course: <strong>{selectCourse.courseName}</strong>
          </Typography>

          <TextField
            label="Update Course Name"
            variant="outlined"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            sx={{ width: "100%" }}
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="warning" onClick={handleUpdateCourse}>
              Update
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </Stack>
        </Stack>
      )}

      <Grid container columns={12} columnSpacing={4} rowSpacing={4} justifyContent="center">
        <Grid sx={{ gridColumn: "span 4" }}>
          <Item>
            <DisplayDate />
          </Item>
        </Grid>

        <Grid sx={{ gridColumn: "span 4" }}>
          <Item>
            <QuotesAPI />
          </Item>
        </Grid>

        <Grid sx={{ gridColumn: "span 4" }}>
          <Item>
            <StudyCalendar />
          </Item>
        </Grid>

        <Grid sx={{ gridColumn: "span 6" }}>
          <Item>
            <UpcomingAssignments
              assignments={assignments}
              userCourseId={user.courseId || user.courseID || null}
            />
          </Item>
        </Grid>

        <Grid sx={{ gridColumn: "span 6" }}>
          <Item>
            <MentorSession />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
