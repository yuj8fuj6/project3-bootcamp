import React, { useEffect, useState } from 'react'
import {
  Scheduler,
  WeekView,

} from "@progress/kendo-react-scheduler";
import { Day } from "@progress/kendo-date-math";
import { sampleData, displayDate } from "./sampleData";


const Timetable = (props) => {
  const [timetableData, setTimetableData] = useState([])
  const [course, setCourse] = useState(props.course);
  const [courseIndex, setCourseIndex] = useState(props.courseIndex);
  //The states below is meant to be set for each axios call to update the data
  const [courseCode, setCourseCode] = useState("");
  const [id, setID] = useState(null);
  const [startTime, setStartTime] = useState(""); //Start time must be referenced to the start of week 1, including day, month, year
  const [endtTime, setEndTime] = useState("");
  const [recessTime, setRecessTime] = useState(""); // This is initialize to be the same as start time but will be used to modify the recurrence exception condition without changing starttime
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