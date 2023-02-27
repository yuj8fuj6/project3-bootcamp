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
import { UserContext } from '../contexts/UserContext';
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
        ...data.course_indices,
      };
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
  console.log(courseRegData)
  console.log(registeredCourseData)
  
  if (courseReg !== undefined) {
    // For later integration
    // let combined = courseReg.map((ele) => ele.course_indices);
    // console.log(combined);
    timetableData = courseReg.map((course) => {
      const [day, start, end] = setTime(course.course_indices);
      console.log(start);
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
  // roomId: dataItem.RoomID,
  // ownerID: dataItem.OwnerID,
  // personId: dataItem.OwnerID

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
  let day = moment(baseDay, "YYYY-MM-DD").add(dayValues[time[0].day], 'days').format()
  let day_start = moment(baseDay + ` ${time[0].start_time}`, "YYYY-MM-DD hh:mm").add(dayValues[time[0].day], 'days').format()
  let day_end =  moment(baseDay + ` ${time[0].end_time}`, "YYYY-MM-DD hh:mm").add(dayValues[time[0].day], 'days').format()
  return [day, day_start, day_end];
}

