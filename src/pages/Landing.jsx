import React, { useEffect, useState } from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
// worry next time, need to relate to user
const Landing = () => {
  const [course, setCourse] = useState([]);
  const [courseIndex, setCourseIndex] = useState([{IE2108: 321173}]); //courseIndex is an array of dictionary with the key being the courses and the value being the index
  //call once when initialise
  // useEffect(() => {
    // call api to GET all the user's registered courses from courseReg table (using user's id)
    // then using course_id, GET all the course_code, setState as course
    // then using a dictionary, form the dictionary where key is the course_code and the value is -e. Rmb to setState as courseIndex
  // }, [])


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
  );
}


export default Landing