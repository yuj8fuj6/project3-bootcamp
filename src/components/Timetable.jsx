import React, { useEffect, useState, useContext } from 'react'
import {
  Scheduler,
  WeekView
} from "@progress/kendo-react-scheduler";
import useSWR from 'swr';
import axios from 'axios';
import { Day } from "@progress/kendo-date-math";
import { sampleData, displayDate } from "./sampleData";
import { BACKEND_URL } from '../constants';
import moment from 'moment';
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Timetable = (props) => {
  const indexes = Object.values(props.courseIndex)
    .filter((x) => x)
    .join("+");
  const courses = Object.keys(props.courseIndex)
    .filter((x) => x)
    .join("+");
  const userData = props.userData;
  const { data: courseReg } = useSWR(
    indexes && courses ? `${BACKEND_URL}/courses/${courses}/${indexes}` : null,
    fetcher
  );
  const { data: registered, mutate: refetch } = useSWR(
    `${BACKEND_URL}/courses/registered/user/${userData?.student?.id}/courses`,
    fetcher
  );
  let timetableData;
  console.log(courseReg);
  console.log(registered);
  let courseRegData;
  if(courseReg !== undefined){
      courseRegData = courseReg.map((data) => {
      let ele = {
        course_code: data.course_code,
        ...data.course_indices[0],
      };
      ele = { ...ele}
      return ele;
    });
  }

  let registeredCourseData;
  if(registered !== undefined){
      registeredCourseData = registered.map(data => {
      let course_code = data.course.course_code
      let ele = {
        course_code: course_code,//course_code,
        ...data
      }
      delete ele.course
      return ele
    });
  }
  //
  let combined
  if(courseRegData  && registeredCourseData){
    combined = courseRegData.concat(registeredCourseData)
  }
  else if (courseRegData === undefined) {
    combined = registeredCourseData
  }
  else if (registeredCourseData === undefined){
    combined = courseRegData
  }
  else{
    console.log("gg.com")
  }
  console.log(combined);
  
  
  if (combined !== undefined) {
    // For later integration
    // let combined = courseReg.map((ele) => ele.course_indices);
    // console.log(combined);
    timetableData = combined.map((course) => {
      const [day, start, end] = setTime(course);
      let data = {
        id: userData.id,
        start: new Date(start),
        end: new Date(end),
        startTimezone: null,
        endTimezone: null,
        title: course.course_code,
        description: "",
        recurrenceRule: "FREQ=WEEKLY;COUNT=14",
        recurrenceId: null,
        recurrenceExceptions: [],
      };
      return data;
    });
  }

  return (
    //need to disable allday
    <Scheduler data={timetableData} defaultDate={displayDate}>
      <WeekView
        title="Full Week"
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Thursday}
      />
    </Scheduler>
  );
}

export default Timetable

function setTime(time){
  const baseDay = "2023-02-19"
  //const day values to add to base day
  const dayValues = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  }
  let day = moment(baseDay, "YYYY-MM-DD").add(dayValues[time.day], 'days').format()
  let day_start = moment(baseDay + ` ${time.start_time}`, "YYYY-MM-DD hh:mm").add(dayValues[time.day], 'days').format()
  let day_end =  moment(baseDay + ` ${time.end_time}`, "YYYY-MM-DD hh:mm").add(dayValues[time.day], 'days').format()
  return [day, day_start, day_end];
}

