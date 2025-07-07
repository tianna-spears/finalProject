import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDesign from "../UI/AuthDesign";
import API from "../../../utils/api";

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
      autoComplete: 'username',  
      "data-testid": "login-email"
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      autoComplete: 'current-password', 
      "data-testid": "login-password" 

    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
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
