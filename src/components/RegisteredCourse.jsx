import React, { useEffect, useState} from "react";
import Button from "../components/Button";
import axios from "axios";
import useSWR from "swr";
import { BACKEND_URL } from "../constants";
import { UserContext } from "../contexts/UserContext";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const RegistedCourses = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Happy</th>
            <th>desk</th>
            <th>destiny</th>
          </tr>
        </thead>
      </table>
      <Button>Print Timetable</Button>
      {/* <Button onClick={registerCourse}>Register</Button> */}
    </div>
  );
}

export default RegistedCourses