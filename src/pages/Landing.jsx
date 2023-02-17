import React, { useEffect, useState } from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
import axios from 'axios';
// worry next time, need to relate to user
const Landing = () => {
  const [course, setCourse] = useState([]);
  const [courseIndex, setCourseIndex] = useState([]); //courseIndex is an array of dictionary with the key being the courses and the value being the index

  //call once when initialise
  useEffect(() => {
    axios.get("http://localhost:3000/courses/IE1005").then((res) =>{
      setCourseIndex(res.data.course_indices);
      console.log(courseIndex);
    })
  }, [])


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