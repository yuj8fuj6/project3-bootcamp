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

// this is how you can destructure props
const Timetable = ({ courseIndex, userData }) => {
  const indexes = Object.values(courseIndex)
    .filter((x) => x)
    .join("+");
  const courses = Object.keys(courseIndex)
    .filter((x) => x)
    .join("+");

  const { data: courseReg } = useSWR(
    indexes && courses ? `${BACKEND_URL}/courses/${courses}/${indexes}` : null,
    fetcher
  );
  const { data: registered, mutate: refetch } = useSWR(
    `${BACKEND_URL}/courses/registered/user/${userData?.student?.id}/courses`,
    fetcher
  );

  let courseRegData;
  if(courseReg){
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
  if(registered){
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
  // I highly dislike this let, followed by if statements pattern.
  // for multiple if statements like so, you can use a switch statement
  // you could also refactor this kind of code into a function, so you can give a name to what you are doing here.
  // comments would also be highly appreciated by anyone reading code like such

  let combined
  if(courseRegData && registeredCourseData){
    combined = courseRegData.concat(registeredCourseData)
  }
  else if (!courseRegData) {
    combined = registeredCourseData
  }
  else if (!registeredCourseData){
    combined = courseRegData
  }
  
  let timetableData;
  if (combined) {
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

