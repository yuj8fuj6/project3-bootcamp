import React, { useEffect, useState } from "react";
import Button from "../components/Button"
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation' 
import { BACKEND_URL } from "../constants";
const fetcher = (url) => axios.get(url).then((res) => res.data);
let courses = "";

const CourseReg = (props) => {
  const studentData = props.studentData
  const { trigger } = useSWRMutation(`${BACKEND_URL}/courses/register`, registerCourses)
  const [courses, setCourse] = useState(""); //used as a query param
  const { data: indexData } = useGetIndexData(courses);
  // add course function: add courses to query to backend and add it to courseIndex to be transferred to other components
  const addCourse = () => {
    let course_code = prompt("Please enter course code", "");
    if(courses.length === 0){
      setCourse(course_code)
    }
    else{
      setCourse(courses + `+${course_code}`)
    }
    let course_index = {
      ...props.courseIndex
    }
    course_index[course_code] = undefined;
    props.setCourseIndex(course_index)
  }

  const handleChange = (e, course) =>{
    e.preventDefault()
    let course_index = {...props.courseIndex}
    console.log(course_index);
    course_index[course.course_code] = course.course_indices[e.target.value].index_code;
    //console.log(course_index);
    props.setCourseIndex(course_index)
    console.log(course_index)
  }

  // const registerCourse = (e, course) => {
  //   e.preventdefault()
  //   const{ data: updated } = 
  // }
  let element
  if(indexData !== undefined){
    element = indexData.map((course, i) => {
      //console.log(course.course_indices.find(ele => ele.index_code === 320671).vacancy)
      let options
      if (course.course_indices !== undefined) {
        options = course.course_indices.map((index, i) => {
          let x = <option value={i}>{index.index_code}</option>;
          return x;
        });
      }
      console.log(props.courseIndex)
      //options.unshift(<option selected disabled> Choose</option>)
      return (
        <tr>
          <th>{i + 1}</th>
          <td>{course.course_code}</td>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => handleChange(e, course)}
          >
            {options}
          </select>
          <td>
            {props.courseIndex[course.course_code] === undefined
              ? "--"
              : course.course_indices.find(
                  (ele) =>
                    ele.index_code === props.courseIndex[course.course_code]
                ).vacancy}
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Course</th>
            <th>Index</th>
            <th>Vacancy</th>
          </tr>
          {element}
        </thead>
      </table>
      <Button onClick={addCourse}>Add Courses</Button>
      {/* <Button onClick={registerCourse}>Register</Button> */}
    </div>
  );
}
//<tbody>{element}</tbody>;
export default CourseReg

function useGetIndexData(courses) {
  return useSWR(() => (courses ? `${BACKEND_URL}/courses/${courses}` : null), fetcher);
}

async function registerCourses(url, { arg }) {
  await axios.post(url, arg).then((res) => res.data);
}
