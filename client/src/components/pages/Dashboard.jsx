import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Course from "../UI/Course";
import Calendar from "../UI/Calendar";
import UpcomingHW from "../UI/UpcomingHW";
import MentorSession from "../UI/MentorSession"

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

export default function Dashboard() {

  // CRUD 
  return (
    <Box
      sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Item>
            <Course />
          </Item>
        </Grid>

        <Grid item xs={12} md={4}>
          <Item>
            <UpcomingHW />
          </Item>
        </Grid>

        <Grid item xs={12} md={4}>
          <Item>
            <MentorSession />
          </Item>
        </Grid>

        <Grid item xs={12} md={4}>
          <Item>
            <Calendar />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
