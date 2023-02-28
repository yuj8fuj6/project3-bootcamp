import React, { useEffect, useState, useContext } from "react";
import Button from "../components/Button";
import axios from "axios";
import useSWR from "swr";
import { UserContext } from "../contexts/UserContext";
import { BACKEND_URL } from "../constants";
const fetcher = (url) => axios.get(url).then((res) => res.data);
const RegistedCourses = (props) => {
  const userData = props.userData;
  let str = `${BACKEND_URL}/courses/temporary/registered/${userData?.student?.id}/courses`;
  const { data: registered, mutate: refetch } = useSWR(
    `${BACKEND_URL}/courses/registered/user/${userData?.student?.id}/courses`,
    fetcher
  );
  console.log(registered);
  let element;
  if (registered !== undefined) {
    element = registered.map((row, i) => {
      let ele = (
        <tr>
          <td>{i + 1}</td>
          <td>{row.course.course_code}</td>
          <td>{row.type}</td>
          <td>{row.group}</td>
          <td>{row.day}</td>
          <td>{row.start_time}</td>
          <td>{row.end_time}</td>
          <td>{row.location}</td>
        </tr>
      );
      return ele;
    });
  }
  console.log(element);
  return (
    <>
      <div className="table-auto overflow-scroll h-full max-h-80">
        <table className="table h-full">
          <thead className="sticky top-0">
            <tr>
              <th className="sticky-header">Num</th>
              <th>Course</th>
              <th>Class Type</th>
              <th>Group</th>
              <th>Day</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>{element}</tbody>
        </table>
      </div>
      <Button>Print Timetable</Button>
    </>
  );
};
export default RegistedCourses;
