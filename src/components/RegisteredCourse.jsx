import React, { useEffect, useState, useContext} from "react";
import Button from "../components/Button";
import axios from "axios";
import useSWR from "swr";
import { UserContext } from "../contexts/UserContext";
import { BACKEND_URL } from "../constants";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const RegistedCourses = (props) => {
  const userData = props.userData;
  let str = `${BACKEND_URL}/courses/temporary/registered/${userData?.student?.id}/courses`;
  const { data: registered, mutate:refetch } = useSWR(`${BACKEND_URL}/courses/temporary/registered/${userData?.student?.id}/courses`,fetcher);
  console.log(registered)
  
  return (
    <div className="table table-compact w-ful">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Course</th>
            <th>Group</th>
            <th>destiny</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
      <Button>Print Timetable</Button>
      {/* <Button onClick={registerCourse}>Register</Button> */}
    </div>
  );
}

export default RegistedCourses