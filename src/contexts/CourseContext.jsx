import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import { BACKEND_URL } from "../constants.js";

export const CourseContext = createContext();

export const CourseContextProvider = (props) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const [allCourseData, setAllCourseData] = useState([]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      axios.get(`${BACKEND_URL}/courses`).then((response) => {
        setAllCourseData(response.data);
      });
    }
  }, [isAuthenticated]);

  return (
    <CourseContext.Provider value={allCourseData}>
      {props.children}
    </CourseContext.Provider>
  );
};
