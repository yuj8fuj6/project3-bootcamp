import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  HomeSVG,
  ProfileSVG,
  ForumSVG,
  MessengerSVG,
  ContactSVG,
  MapSVG,
  LogoutSVG,
} from "../assets/SVG";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <nav className="navbar">
      <Link to="/main">
        <Logo />
      </Link>
      <ul className="menu menu-horizontal px-1">
        {/* This seems to repeat itself nicely. Why not create an array of objects to map here?
        
        // this can be defined outside of the component
          const navbarMenuItems = [
            {
              url: "/main",
              icon: <HomeSVG />
              label: "Home"
            }
          ]

          {navbarMenuItems.map((item) => {
            return (
              <li>
                <Link to={item.url} className="justify-center-link">
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            )
          })}
        */}
        <li>
          <Link to="/main" className="justify-center-link">
            <HomeSVG />
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="justify-center-link">
            <ProfileSVG />
            Profile
          </Link>
        </li>
        <li>
          <Link to="/forum" className="justify-center-link">
            <ForumSVG />
            Forum
          </Link>
        </li>
        <li>
          <Link to="/messenger" className="justify-center-link">
            <MessengerSVG />
            Messenger
          </Link>
        </li>
        <li>
          <Link to="/contact" className="justify-center-link">
            <ContactSVG />
            Contact
          </Link>
        </li>
        <li>
          <Link to="/map" className="justify-center-link">
            <MapSVG />
            Map
          </Link>
        </li>
        <li>
          <button className="justify-center-link" onClick={handleLogout}>
            <LogoutSVG />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
