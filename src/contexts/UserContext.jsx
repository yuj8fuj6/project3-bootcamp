import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState("");
  const [allUserData, setAllUserData] = useState([]);
  const [userPhotoURL, setUserPhotoURL] = useState("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const { email } = user;
      setEmail(email);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (email) {
      axios.get(`${BACKEND_URL}/users/${email}`).then((response) => {
        setUserData(response.data);
      });
    }
  }, [email]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/users`).then((response) => {
        setAllUserData(response.data);
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (email) {
      axios.get(`${BACKEND_URL}/users/${email}`).then((response) => {
        setUserPhotoURL(response.data.profile_pic_url);
      });
    }
  }, [userData.profile_pic_url]);

  return (
    <UserContext.Provider value={{ userData, allUserData, userPhotoURL}}>
      {props.children}
    </UserContext.Provider>
  );
};
