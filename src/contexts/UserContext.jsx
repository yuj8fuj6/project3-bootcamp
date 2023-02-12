import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    console.log("loading");
  } else if (!isAuthenticated) {
    console.log("authenticated: ", isAuthenticated);
  } else if (!isLoading && isAuthenticated) {
    const { name, picture, email } = user;
    console.log(email);
  }

  const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   if(isAuthenticated){
  //     const {name, email} = user;
  //     console.log(email);
  //   }
  // }, []);

  return (
    <UserContext.Provider value={userData}>
      {props.children}
    </UserContext.Provider>
  );
};
