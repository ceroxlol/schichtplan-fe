import moment from "moment";

export function formatTimeRange(shift) {
  return moment(shift.start).format("HH:mm") + " - " + moment(shift.end).format("HH:mm");
}
