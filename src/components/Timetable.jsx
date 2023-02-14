import React, { useEffect, useState } from 'react'
import {
  Scheduler,
  WeekView,

} from "@progress/kendo-react-scheduler";
import { Day } from "@progress/kendo-date-math";
import { sampleData, displayDate } from "./sampleData";


const Timetable = () => {
  const [courseData, setCourseData] = useState({})
  useEffect(() => {

  }, [courseData])
  return (
    //need to disable allday
    <Scheduler data={sampleData} defaultDate={displayDate} >
      <WeekView
        title="Full Week"
        workWeekStart={Day.Monday}
        workWeekEnd={Day.Thursday}
      />
    </Scheduler>
  );
}

export default Timetable