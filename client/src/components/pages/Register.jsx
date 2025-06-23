import { useState } from "react";
import AuthDesign from "../UI/AuthDesign";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault();
 if (firstName && lastName&& email&& password) {
  navigate('/dashboard')
 }
    };

  return (
    <AuthDesign
      title="Register"
      inputFields={inputFields}
      buttonText="Register"
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
