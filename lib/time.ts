import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
// Function to get the time range (gte and lte values) based on a given range value (day, week, or month)

export function timeAgo(timestamp: number) {
  return dayjs.unix(timestamp).fromNow();
}
