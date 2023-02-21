import React, { useEffect, useState, useContext } from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
import axios from 'axios';
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../contexts/UserContext";
import useSWR from"swr"
import { BACKEND_URL } from '../constants';
// worry next time, need to relate to user
const Landing = () => {
  const [course, setCourse] = useState([]);
  const [courseIndex, setCourseIndex] = useState([]); //courseIndex is an array of dictionary with the key being the courses and the value being the index
  const { userData } = useContext(UserContext);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    `${BACKEND_URL}/users/${userData.email_address}`,
    fetcher
  );
  //call once when initialise
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  },[]);
  return (
    <div>
      <Navbar />
      <div className="columns">
        <Timetable courseIndex={courseIndex} />
        <div className="rows">
          <CourseReg studentData={data} setCourseIndex={setCourseIndex} />
          <CourseReg studentData={data} courseIndex={setCourseIndex} />
        </div>
      </div>
    </div>
  );
}

export default Landing;
