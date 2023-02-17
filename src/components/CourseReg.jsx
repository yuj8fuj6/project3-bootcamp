import React, { useEffect, useState } from "react";
import Button from "../components/Button"
import axios from "axios";

const CourseReg = (props) => {
  // const [courseIndex, setCourseIndex] = useState(props.courseIndex);
  // const [courses, setCourse] = useState(props.course)
  const [index, setIndex] = useState(props.courseIndex);//own course index
  const [courseIndex, setCourseIndex] = useState({}); //update whenever user changes the index
  const [courses, setCourse] = useState([
    { course_code: "IE2108", vaccancy: 5 },
    { course_code: "IE2110", vaccancy: 8 },
  ]);

  //handleChange will select the course's index and update in Timetable.jsx via Landing.jsx
  // const handleChange = (e) =>{
    //send timetable index to Timetables.jsx
    //must trigger re-render
  //}
   let options = index.map((index) => <option>{index.index_code}</option>);
  //mapping options and course for easy display (refactoring code)
    let element = courses.map((course, i) => { 
    //need an async function here and cannot use async in map
    // call api for index of each course data and then setIndex
    // axios.get("url").then((res) => {
    //   setIndex(res)
    // })
    // let options = index.map((index) => <option>{index}</option>);
    return (
      <tr>
        <th>{i + 1}</th>
        <td>{course.course_code}</td>
        <select className="select select-ghost w-full max-w-xs">
          {options}
        </select>
        <td>{`${course.vaccancy}`}</td>
      </tr>
    );
  });

  const addCourse = () => {
    let course = prompt("Please enter course code", "");
    //Backend query
    //if exist add to courses state
    //insert data into courseReg table
    // try {
      
    // }
    //If does not exist throw error message
    //catch (error) {
      
    // }
    setCourse([...courses, { course_code: "IE2106", vaccancy: 10 }]);
  }
  return (
    <div>
      <div className="overflow-x-auto max-h-72">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Course Code</th>
              <th>Index</th>
              <th>Vaccancy</th>
            </tr>
          </thead>
          <tbody>{element}</tbody>
        </table>
      </div>
      <Button onClick={addCourse}>Add Course</Button>
      {/* <Button onClick={deleteCourse}>Delete Course</Button> */}
      <Button>Print timetable</Button>
    </div>
  );
}
export default CourseReg
