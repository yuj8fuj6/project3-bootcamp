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
  const indexes = Object.values(props.courseIndex).filter(x => x).join("+")
  const courses = Object.keys(props.courseIndex).filter(x => x).join("+");
  const { userData } = useContext(UserContext);
  const { data } = useSWR(indexes && courses ? `${BACKEND_URL}/courses/${courses}/${indexes}` : null, fetcher);
  console.log(data)
  let timetableData
  if(data !== undefined){
    console.log(data)
    timetableData = data.map((course) => {
      const [day, start, end] = setTime(course.course_indices);
      console.log(start)
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
  console.log(timetableData)
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

