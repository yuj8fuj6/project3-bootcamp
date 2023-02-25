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
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Timetable = (props) => {
  const indexes = Object.values(props.courseIndex).filter(x => x).join("+")
  const courses = Object.keys(props.courseIndex).filter(x => x).join("+");
  const { userData } = useContext(UserContext);
  const [course, setCourse] = useState(props.course);
  const { data } = useSWR(indexes && courses ? `${BACKEND_URL}/courses/${courses}/${indexes}` : null, fetcher);

  let timetableData
  if(data !== undefined){
    timetableData = data.map((course) => {
      let data = {
        id: userData.id,
        start: new Date("2023-06-22T07:00:00.000Z"),
        end: new Date("2023-06-22T08:00:00.000Z"),
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

