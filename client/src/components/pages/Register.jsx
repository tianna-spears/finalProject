import { useState } from "react";
import AuthDesign from "../UI/AuthDesign";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import Course from "../UI/Course";
import { Box } from "@mui/material";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectCourse, setSelectCourse] = useState("");

  const navigate = useNavigate();

  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      value: firstName,
      onChange: (e) => setFirstName(e.target.value),
    },
    {
      label: "Last Name",
      name: "lastName",
      value: lastName,
      onChange: (e) => setLastName(e.target.value),
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // connect to my API here!
    if (firstName && lastName && email && password && selectCourse) {
      try {
        const res = await API.post("/register", {
          firstName,
          lastName,
          email,
          password,
          courseName: selectCourse,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);

        console.log("Registration successful:", res.data);
        navigate("/dashboard");
      } catch (err) {
        console.error(
          "Registration failed:",
          err.response?.data || err.message
        );
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={1}
        sx={{ width: "100%", maxWidth: 400, margin: "0 auto", mt: 4 }}
      >
        <Course selectCourse={selectCourse} setSelectCourse={setSelectCourse} />

        <AuthDesign
          title="Register"
          inputFields={inputFields}
          buttonText="Register"
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
};

export default Register;
