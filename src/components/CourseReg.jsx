import React, { useEffect, useState } from "react";
import Button from "../components/Button"
import axios from "axios";
import useSWR from "swr";
import { BACKEND_URL } from "../constants";
const fetcher = (url) => axios.get(url).then((res) => res.data);
let courses = "";

const CourseReg = (props) => {
  // const [courseIndex, setCourseIndex] = useState(props.courseIndex);
  // const [courses, setCourse] = useState(props.course)
  const studentData = props.studentData
  //const [indexData, setIndexData] = useState([]);//specific course indexs
  const [courseIndex, setCourseIndex] = useState({}); //update whenever user changes the index
  const [vacancy, setVacancy] = useState(null)
  const [courses, setCourse] = useState("");
  const { data: indexData } = useGetIndexData(courses);
  console.log(indexData)
  const addCourse = () => {
    let course_code = prompt("Please enter course code", "");
    if(courses.length === 0){
      setCourse(course_code)
    }
    else{
      setCourse(courses + `+${course_code}`)
    }
    console.log(courses)
  }

  const handleChange = (e) =>{
    setVacancy(e.target.value)
  }
  let element
  if(indexData !== undefined){
    element = indexData.map((course, i) => {
      let options
      if(course.course_indices !== undefined){
        console.log(course);
        options = course.course_indices.map((index, i) => {
          let x = (
              <option value={i}>{index.index_code}</option>
          );
          return x
        });
      }

      return (
        <tr>
          <th>{i + 1}</th>
          <td>{course.course_code}</td>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleChange}
          >
            <option disabled selected>
              Choose Index
            </option>
            {options}
          </select>
          <td>
            {vacancy === null ? "--" : course.course_indices[vacancy].vacancy}
          </td>
        </tr>
      );
    })
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
          {element}
        </thead>
      </table>
      <Button onClick={addCourse}>Add Courses</Button>
    </div>
  );
}
//<tbody>{element}</tbody>;
export default CourseReg

function useGetIndexData(courses) {
  return useSWR(() => (courses ? `${BACKEND_URL}/courses/${courses}` : null), fetcher);
}
