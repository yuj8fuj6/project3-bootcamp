import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { BACKEND_URL } from "../constants";
import { Modal } from "antd";
import CourseModal from "./CourseModal";
import "./courseReg.css";
import { useAuth0 } from "@auth0/auth0-react";

const fetcher = (url) => axios.get(url).then((res) => res.data);
// what is this variable for? :D
let courses = "";

const CourseReg = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const studentData = props.studentData;
  const [courses, setCourse] = useState(""); //used as a query param
  const { data: indexData } = useGetIndexData(courses);
  const [courseName, setCourseName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState({});
  // add course function: add courses to query to backend and add it to courseIndex to be transferred to other components
  const addCourse = () => {
    // We should not use prompt in a React app as it blocks website interaction and React's goal is to let the user interact as much and fluent as possible. If we need user input, use an html input.
    const course_code = prompt("Please enter course code", "");
    setCourse(courses.length ? courses + `+${course_code}` : course_code)

    const course_index = {
      // could maybe destructure your props in line 16 instead of accessing props.* over and over
      ...props.courseIndex,
    };
    course_index[course_code] = undefined;
    props.setCourseIndex(course_index);
    setCourseName(course_code);
  };

  const deleteCourse = () => {
    // I find this whole function a bit messy to be honest. Some refactoring would do quite good here. Seems like a good case of rushing to get things done, but in the end creating a lot of confusion as well with it.
    const course_index = {
      ...props.courseIndex,
    };
    const courses = Object.keys(props.courseIndex);
    const course_code = prompt("Please enter course code", "");
    if (!courses.length) {
      // alert same as with prompt, ideally use a modal here instead of alert. Or even better a snackbar/toast or something.
      alert("There is no courses to delete");
    } else if (courses.indexOf(course_code) !== -1 || course_code === "") {
      delete course_index[course_code];
    } else {
      alert(`${course_code} is present in your current courses`);
    }

    props.setCourseIndex(course_index);
    const a = courses.indexOf(course_code);
    courses.splice(a, 1);
    setCourse(courses.join("+"));
  };

  const handleChange = (e, course) => {
    e.preventDefault();
    const course_index = { ...props.courseIndex };
    // some comment to explain would be good here
    course_index[course.course_code] =
      course.course_indices[e.target.value].index_code;
    props.setCourseIndex(course_index);
  };

  const registerCourse = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: "read:current_user",
    });
    const indexes = Object.values(props.courseIndex);
    const courses = Object.keys(props.courseIndex);

    // ideally we don't overwrite existing variables, but create new ones
    // this here is extremely inefficient, should be O(n * k*2)
    // is there a way to retrieve this data from the BE? the FE should not handle such calculation intensive tasks
    indexes = indexes.map((index, i) => {
      const course = indexData.find(
        (course) => course.course_code === courses[i]
      );
      const indice = course.course_indices.find(
        (slot) => slot.index_code === index
      );
      return indice.id;
    });

    if (indexes.length) {
      const data = await axios
        .post(
          `${BACKEND_URL}/courses/register/${studentData.id}/${studentData.student.id}`, // this route seems quite odd to me
          {
            studentID: studentData.student.id,
            indexes: indexes,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .catch((err) => console.log(err));
    }
    window.location.reload(); // we should not do a reload on a react page, this defeats the whole purpose of react
  };

  const handleOpenCourse = async () => {
    await axios.get(`${BACKEND_URL}/courses/${courseName}`).then((response) => {
      setCourseData(response.data);
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let element; // element is a not a good variable name
  if (indexData.length) {
    element = indexData.map((course, i) => {
      let options;
      if (course.course_indices !== undefined) {
        // map in a map, either a bad data structure decision, or a bad implementation decision
        // We could probably use lodash to create an object where the key is the course id and the value is the indices so we could avoid doing this nested looping
        options = course.course_indices.map((index, i) => {
          return <option value={i}>{index.index_code}</option>;
        });
      }
      return (
        <tr>
          <th>{i + 1}</th>
          <td onClick={handleOpenCourse} className="courseCode">
            {course.course_code}
          </td>
          <Modal
            title="Course Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width="30vw"
            footer={null}
            className="modalBody"
          >
            <CourseModal courseData={courseData} />
            <div className="modalFooter">
              <Button onClick={handleOk} className="modalBtn">
                Exit
              </Button>
            </div>
          </Modal>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => handleChange(e, course)}
          >
            {options}
          </select>
          <td>
            {!props.courseIndex[course.course_code]
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
            <th>Num</th>
            <th>Course</th>
            <th>Index</th>
            <th>Vacancy</th>
          </tr>
          {element}
        </thead>
      </table>
      <div className="buttonWrapper">
        <Button onClick={addCourse}>Add Courses</Button>
        <Button onClick={registerCourse}>Register Courses</Button>
        <Button onClick={deleteCourse}>Delete Course</Button>
      </div>
    </div>
  );
};
//<tbody>{element}</tbody>;
export default CourseReg;

function useGetIndexData(courses) {
  return useSWR(
    () => (courses ? `${BACKEND_URL}/courses/${courses}` : null),
    fetcher
  );
}
