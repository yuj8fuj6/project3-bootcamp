import React, { useState, useEffect } from "react";
import { Backend_URL } from "../Backend_URL";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "antd";

export default function ModalBody() {
  const [course, setCourse] = useState([]);
  const [course_id, setCourse_id] = useState();
  const params = useParams();

  useEffect(() => {
    axios.get(`${Backend_URL}/course/${course_id}`).then((response) => {
      console.log(`hihi`, response.data);
      setCourse(response.data);
    });
  }, [course_id]);

  if (course_id !== params.course_id) setCourse_id(params.course_id);

  // const courseDetails = Object.entries(course).map((courses) => (
  //   <div>
  //     <Typography>Course code:</Typography>
  //     <Typography>{course.school}</Typography>
  //   </div>
  // ));

  return (
    <div className="sm:flex">
      <div className="mt-2">
        {/* <div>{courseDetails}</div> */}
        <h1 className="text-sm">Course Title</h1>
        <p className="text-sm text-gray-500">Data Structures and Algorithms</p>
        <h1 className="text-sm">Course Location</h1>
        <p className="text-sm text-gray-500">LT26</p>
        <h1 className="text-sm">Academic Unit</h1>
        <p className="text-sm text-gray-500">3</p>
        <h1 className="text-sm">Lecturer</h1>
        <p className="text-sm text-gray-500">Prof. Tan Ah Beng</p>
        <h1 className="text-sm">Course Description</h1>
        <p className="text-sm text-gray-500">
          A brief introduction to Data Structures and Algorithms. Students will
          learn to apply Algorithms to real-life problems. Students will need to
          pass this course before they can apply for the Object-Oriented
          Programming module in Java.
        </p>
      </div>
      <div className="mt-2">
        <h1 className="text-sm">Map</h1>
        <p className="text-sm text-gray-500">Map</p>
        <h1 className="text-sm">Selected Index</h1>
        <p className="text-sm text-gray-500">3</p>
        <h1 className="text-sm">Pre-requisites</h1>
        <p className="text-sm text-gray-500">EEE234, EEE456</p>
        <h1 className="text-sm">Available Indexes/Vacancies</h1>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
        <p className="text-sm text-gray-500">23456/0 - Tue - 12:30 to 14:30</p>
      </div>
    </div>
  );
}
