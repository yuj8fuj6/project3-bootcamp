import React, { useEffect, useState } from "react";
import Button from "../components/Button"
import axios from "axios";

const CourseReg = () => {
  const [index, setIndex] = useState([1,2,3,4,5,6])
  const [courses, setCourse] = useState([{course_code: "EE2108", vaccancy: 5}])
  const [test, setTest] = useState('')
  let options = index.map(index => <option>{index}</option>)
  let courseReg = courses.map((course, i) => (
    <tr>
      <th>{i+1}</th>
      <td>{course.course_code}</td>
      <select className="select select-ghost w-full max-w-xs">
        {options}
      </select>
      <td>{`${course.vaccancy}`}</td>
    </tr>
  ));

  const addCourse = async() => {
    let person = prompt("Please enter your name", "Harry Potter");
    //try catch here
    // try {
      
    // } catch (error) {
    //   alert(`Course Code ${person} not found!`);
    // }
  }
  return (
    <div>
      <div className="overflow-x-auto max-h-72">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Course Code</th>
              <th>Indec</th>
              <th>Vaccancy</th>
            </tr>
          </thead>
          <tbody>
            {courseReg}
          </tbody>
        </table>
      </div>
      <Button>Add Course</Button>
      <Button>Print timetable</Button>
    </div>
  );
}

export default CourseReg
