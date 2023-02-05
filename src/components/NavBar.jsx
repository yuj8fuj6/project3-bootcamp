import React from "react";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <Logo />
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="profile">Pofile</CustomLink>
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
  const resolvedPath = useResolvedPath(to);

  // to determine if resolvedPath is active, without "end:true", partially matched URL
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
