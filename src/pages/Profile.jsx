import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  console.log(user);

  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />
      <div className="bg-darkgrey text-yellow">Profile</div>
      <button onClick={handleSubmit()}>Press</button>
    </div>
  );
};

export default Profile;
