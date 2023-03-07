import React from "react";
import "./Logo.css";

// since this is always the same image, I think this component is redundant
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
