import React from "react";
import { ImArrowUpRight2 } from "react-icons/im";


const NavBar = () => {
  return (
<nav className="fixed w-full bg-white text-purple p-4 top-0 left-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between">
        <div className="text-xl font-bold text-black">
            
            <h3> Apprenti <ImArrowUpRight2 /> </h3> 
            </div>
<div className="flex flex-col space-y-2">
  <a href="#home" className="hover:underline">Home</a>
  <a href="#register" className="hover:underline">Register</a>
  <a href="#login" className="hover:underline">Login</a>
</div>

      </div>
    </nav>
  );
};

export default NavBar;
