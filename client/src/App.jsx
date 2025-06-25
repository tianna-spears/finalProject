import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/UI/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
