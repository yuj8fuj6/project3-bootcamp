import React, { useEffect, useState } from "react";
import Button from "../components/Button"
import axios from "axios";

const CourseReg = () => {
  const [index, setIndex] = useState([1,2,3,4,5,6])
  const [courses, setCourse] = useState([{course_code: "EE2108", vaccancy: 5}])

  useEffect(() => {
    //call api to get courses from courseReg table
    
  }, [courses])
  //mapping options and course for easy display (refactoring code)
  
  let courseReg = courses.map(async(course, i) => {
    // call api for index data and then setIndex
    // axios.get("url").then((res) => {
    //   setIndex(res)
    // })
    let options = index.map((index) => <option>{index}</option>);
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
    let course = prompt("Please enter your name", "Harry Potter");
    //Backend query
    //if exist add to courses state
    //insert data into courseReg table
    // try {
      
    // }
    //If does not exist throw error message
    //catch (error) {
      
    // }
    setCourse([...courses, { course_code: "EE2107", vaccancy: 5 }]);
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
          <tbody>
            {courseReg}
          </tbody>
        </table>
      </div>
      <Button onClick={addCourse}>Add Course</Button>
      <Button>Print timetable</Button>
    </div>
  );
}

export default CourseReg
