import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const AuthDesign = ({ title, inputFields, buttonText, onSubmit}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ width: 400 }}>
        <CardHeader title={title} titleTypographyProps={{ align: "center", variant: "h4" }} />
        <CardContent>
          <form onSubmit={onSubmit}>
            <Stack spacing={2} alignItems="center">
              {inputFields.map(({ label, type = "text", name }, index) => (
                <TextField
                  key={index}
                  label={label}
                  type={type}
                  name={name}
                  variant="outlined"
                  color="secondary"
                  sx={{ width: "100%" }}
                  required
                />
              ))}
              <Button variant="contained" color="secondary" sx={{ width: 200 }} type="submit">
                {buttonText}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthDesign;
