import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";

const NavBar = () => {
  return (
    <nav>
      <div>
        <div>
          <h3>
            {" "}
            Apprenti <ImArrowUpRight2 />{" "}
          </h3>
        </div>
        <div>
          <a href="">Home</a>
          <a href="">Register</a>
          <a href="">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
