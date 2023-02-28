const data = [
  {
    TaskID: 120,
    OwnerID: 3,
    Title: "Website upload",
    Description: "",
    StartTimezone: null,
    Start: "2013-06-07T07:00:00.000Z",
    End: "2013-06-07T08:30:00.000Z",
    EndTimezone: null,
    RecurrenceRule: "FREQ=WEEKLY;BYDAY=WE;COUNT=14",
    RecurrenceID: null,
    RecurrenceException: [new Date("2023-06-28T07:00:00.000Z")],
    isAllDay: false,
  },
];
const currentYear = new Date().getFullYear();
export const displayDate = new Date(Date.UTC(currentYear, 2, 19));
const parseAdjust = (eventDate) => {
  //adjust the time to current year
  const date = new Date(eventDate);
  const d = new Date();
  if (d.getMonth() == 11) {
    date.setFullYear(currentYear + 1);
  } else {
    date.setFullYear(currentYear);
  }
  return date;
};
export const sampleData = data.map((dataItem) => ({
  id: dataItem.TaskID,
  start: parseAdjust(dataItem.Start),
  startTimezone: dataItem.startTimezone,
  end: parseAdjust(dataItem.End),
  endTimezone: dataItem.endTimezone,
  isAllDay: dataItem.isAllDay,
  title: dataItem.Title,
  description: dataItem.Description,
  recurrenceRule: dataItem.RecurrenceRule,
  recurrenceId: dataItem.RecurrenceID,
  recurrenceExceptions: dataItem.RecurrenceException,
  roomId: dataItem.RoomID,
  ownerID: dataItem.OwnerID,
  personId: dataItem.OwnerID,
}));
