import React from "react";
import "./Logo.css";

const Logo = (props) => {
  return (
    <img
      src={require("../assets/Logo_04.png")}
      className="Navbar-Logo"
      alt="Website-Logo"
      {...props}
    />
  );
};

export default Logo;
