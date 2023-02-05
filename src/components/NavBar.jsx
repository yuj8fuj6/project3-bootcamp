import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        Site Name
      </a>
      <ul>
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="forum">Forum</a>
        </li>
        <li>
          <a href="messenger">Messenger</a>
        </li>
        <li>
          <a href="contact">Contact</a>
        </li>
        <li>
          <a href="map">Map</a>
        </li>
      </ul>
    </nav>
  );
}
