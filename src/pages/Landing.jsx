import React from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
const Landing = () => {
  return (
    <div>
      <Logo />
      <div className="columns">
        <Timetable />
        <div className="rows">
          <CourseReg/>
          <CourseReg/>
        </div>
      </div>
    </div>
  );
}


export default Landing