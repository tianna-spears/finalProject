import React, { useEffect, useState } from "react";
import API from "../../../utils/api";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import UpcomingAssignments from "../UI/UpcomingAssignments";
import MentorSession from "../UI/MentorSession";
import StudyCalendar from "../UI/StudyCalendar";
import DisplayDate from "../UI/DisplayDate";

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

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token"); 
        // console.log("TOKEN:", token);

        const res = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setUser(res.data.user);
        setAssignments(res.data.assignments);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!user) return <div>Error loading user data.</div>;

  return (
    <Box
      sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      <Typography variant="subtitle1" align="center" gutterBottom>
        Welcome, {user.name ? user.name : "N/A"}!
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Enrolled in: <strong>{user.courseName ? user.courseName : "N/A"}</strong>
      </Typography>
      <Grid
        container
        columns={12}
        columnSpacing={4}
        rowSpacing={4}
        justifyContent="center"
      >
        <Grid sx={{ gridColumn: "span 4" }}>
          <Item>
            <DisplayDate />
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
            {/* add buttons here CRUD */}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
