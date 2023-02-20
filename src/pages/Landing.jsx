import React, { useEffect, useState } from 'react'
import Logo from "../components/Logo";
import Timetable from '../components/Timetable';
import CourseReg from "../components/CourseReg";
import "../App.css";
import axios from 'axios';
import useSWR from "swr";

//must use the word 'use' to use hooks
const useCourse = (course_code) =>{
const {
  data: course,
  error,
  isLoading,
  mutate: refetch,
} = useSWR(`http://localhost:3000/courses/${course_code}`, fetcher);

return {course, error,isLoading, refetch}
}

const fetcher = (url) => axios.get(url).then((res) => res.data);
const Landing = () => {
  //const [course, setCourse] = useState([]);
  const [ chosenIndex, setChosenIndex ] = useState(0); //courseIndex is an array of dictionary with the key being the courses and the value being the inde
  const { course, error, isLoading, refetch } = useCourse("IE1005")

  if(isLoading || error){ //need to put this down as the initial render will not render the data as we waiting response so undefined
    return <div></div>
  }
  console.log(chosenIndex)
  return (
    <div>
      <Logo />
      <div className="columns">
        <Timetable course={course} chosenIndex={chosenIndex} />
        <div className="rows">
          <CourseReg course={course} setChosenIndex={setChosenIndex} />
          <CourseReg course={course} setChosenIndex={setChosenIndex} />
        </div>
      </div>
    </div>
  );
}


export default Landing