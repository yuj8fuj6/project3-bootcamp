import React from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <img
      src={require("../assets/Logo_04.png")}
      className="Navbar-Logo"
      alt="Website-Logo"
    />
  );
};

export default Logo;
