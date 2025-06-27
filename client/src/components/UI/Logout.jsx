import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    setIsLoggedOut(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }, [navigate]);

  return <span> {isLoggedOut && "You are successfully signed out."}</span>;
};

export default Logout;
