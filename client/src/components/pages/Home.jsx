import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardHeader, CardContent, Typography, Stack, Button } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 2 }}>
      <Card>
        <CardHeader title="Welcome to the Student Study Manager!" />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            We help Code The Dream students stay focused on the road to success.
          </Typography>

          <Stack spacing={2} mt={2}>
            <Button variant="contained" color="primary" component={Link} to="/register">
              Click here to Register.
            </Button>

            <Button variant="outlined" color="primary" component={Link} to="/login"  data-testid="goto-login">
              Already a user? Click here to Login.
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
