import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

export const ForumContext = createContext();

export const ForumContextProvider = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const [allForumData, setAllForumData] = useState([]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/forums`).then((response) => {
        setAllForumData(response.data);
      });
    }
  }, [isAuthenticated]);

  return (
    <ForumContext.Provider value={allForumData}>
      {props.children}
    </ForumContext.Provider>
  );
};
