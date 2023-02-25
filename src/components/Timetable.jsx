import React, { useEffect, useState } from 'react'
import {
  Scheduler,
  WeekView
} from "@progress/kendo-react-scheduler";
import useSWR from 'swr';
import axios from 'axios';
import { Day } from "@progress/kendo-date-math";
import { sampleData, displayDate } from "./sampleData";
import { BACKEND_URL } from '../constants';
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Timetable = (props) => {
  const indexes = Object.values(props.courseIndex).filter(x => x).join("+")
  const courses = Object.keys(props.courseIndex).filter((x) => x).join("+");
  const [course, setCourse] = useState(props.course);
  const [courseIndex, setCourseIndex] = useState(props.courseIndex);
  const { data } = useSWR(indexes && courses ? `${BACKEND_URL}/courses/${courses}/${indexes}` : null, fetcher);
  console.log(data)
  //Generate timetabledata
  // useEffect(async()=>{
  //   //axios call to set courseCode, id, StartTime, EndTime from Index_table. Then set Timetable data
  //   for(let i = 0; i < course.length; i++){
  //     let data = {
  //       // TaskID: id,
  //       // OwnerID: null,  //worry later
  //       // Title: courseCode,
  //       // Description: "",
  //       // StartTimezone: null,
  //       // Start: startTime,
  //       // End: endtTime,
  //       // EndTimezone: null,
  //       // RecurrenceRule: "FREQ=WEEKLY;COUNT=14",
  //       // RecurrenceID: null,
  //       // RecurrenceException: [new Date(recessTime.setDate(recessTime.getDate()+49))],
  //       // isAllDay: false,
  //     };
  //     timetableData.push(data)
  //   }
  // },[course, courseIndex])

  // id: dataItem.TaskID,
  // start: parseAdjust(dataItem.Start),
  // startTimezone: dataItem.startTimezone,
  // end: parseAdjust(dataItem.End),
  // endTimezone: dataItem.endTimezone,
  // isAllDay: dataItem.isAllDay,
  // title: dataItem.Title,
  // description: dataItem.Description,
  // recurrenceRule: dataItem.RecurrenceRule,
  // recurrenceId: dataItem.RecurrenceID,
  // recurrenceExceptions: dataItem.RecurrenceException,
  // roomId: dataItem.RoomID,
  // ownerID: dataItem.OwnerID,
  // personId: dataItem.OwnerID

  return (
    //need to disable allday
    <Scheduler data={sampleData} defaultDate={displayDate}>
      <WeekView
        title="Full Week"
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Thursday}
      />
    </Scheduler>
  );
}

export default Timetable
//data to be passed through for this component need to be in this format
    // TaskID: index_table primary key id,
    // OwnerID: usersID,  //worry later
    // Title: Course_code
    // Description: "",
    // StartTimezone: null,
    // Start: start_time,
    // End: end_time,
    // EndTimezone: null,
    // RecurrenceRule: "FREQ=WEEKLY;COUNT=14",
    // RecurrenceID: null,
    // RecurrenceException: null, // null for now till it fixed the ticket
    // isAllDay: false,