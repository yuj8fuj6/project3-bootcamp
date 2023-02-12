import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Profile = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const { user } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // console.log("authenticated", isAuthenticated);
  console.log("user", user);

  return (
    <div>{JSON.stringify(user, null, 2)}</div>

    // isAuthenticated && (
    //   <div>
    //     <img src={user.picture} alt={user.name} />
    //     <h2>{user.name}</h2>
    //     <p>{user.email}</p>
    //   </div>
    // )
  );
};

export default Profile;
