import React from "react";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Site Name
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/profile">Pofile</CustomLink>
        <CustomLink to="/forum">Forum</CustomLink>
        <CustomLink to="/messenger">Messenger</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
        <CustomLink to="/map">Map</CustomLink>
        {/*Logout button not working yet*/}
        <li>Logout</li>
      </ul>
    </nav>
  );
}

// to have an active display when CustomLink is selected
function CustomLink({ to, children, ...props }) {
  // console.log(window.location.pathname);
  // const path = window.location.pathname;
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <li className={isActive === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
