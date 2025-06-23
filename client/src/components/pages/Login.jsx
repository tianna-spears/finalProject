import { useState } from "react";
import AuthDesign from "../UI/AuthDesign";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputFields = [
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
    console.log("Login form:", { email, password });
  };
  return (
    <AuthDesign
      title="Login"
      inputFields={inputFields}
      buttonText="Login"
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
