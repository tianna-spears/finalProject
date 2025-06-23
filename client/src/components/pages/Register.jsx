import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

const Register = () => {
  return (
    <div>
      <form>
        <Card variant="outlined">
          <CardHeader>Register </CardHeader>
          <div>
            <TextField label="FirstName" color="secondary" focused />

            <TextField label="Last Name" color="secondary" focused />

            <TextField label="Email" color="secondary" focused />
          </div>

          <Stack spacing={2} direction="row">
            <Button type="submit" variant="outlined">
              Register
            </Button>
          </Stack>
        </Card>
      </form>
    </div>
  );
};

export default Register;