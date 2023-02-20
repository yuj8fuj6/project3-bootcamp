import React, { useEffect, useState } from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
import axios from 'axios';
import Modal from "../components/Modal";
import Navbar from "../components/NavBar";
import { useAuth0 } from "@auth0/auth0-react";
// worry next time, need to relate to user
const Landing = () => {
  const [course, setCourse] = useState([]);
  const [courseIndex, setCourseIndex] = useState([]); //courseIndex is an array of dictionary with the key being the courses and the value being the index

  //call once when initialise
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  },[]);


  return (
    <div>
      <Logo />
      <div className="columns">
        <Timetable course={course} courseIndex={courseIndex} />
        <div className="rows">
          <CourseReg course={course} courseIndex={courseIndex} />
          <CourseReg course={course} courseIndex={courseIndex} />
        </div>
      </div>
    </div>
  )
}

export default Landing;
