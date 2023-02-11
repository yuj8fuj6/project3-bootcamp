import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="bg-darkgrey text-yellow">Profile</div>
      <button onClick={handleSubmit()}>Press</button>
    </div>
  );
};

export default Profile;
