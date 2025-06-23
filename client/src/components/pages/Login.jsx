import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDesign from "../UI/AuthDesign";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
    if (email && password) {
      navigate('/dashboard');
    }
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
