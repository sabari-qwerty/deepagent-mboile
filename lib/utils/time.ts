export const MonthHashMap: { [key: string]: string } = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const timeStampFormatter = (time: string) => {
  const data = new Date(time);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (data.toDateString() === yesterday.toDateString()) {
    return "yesterday";
  }

  if (data.toDateString() === now.toDateString()) {
    return data.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return data
    .toLocaleTimeString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .split(",")[0];
};

const DateAndtime = ({ timeStamp }: { timeStamp: string }) => {
  const date = new Date(timeStamp);

  const hours = date.getHours();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";

  let time = hours % 12;

  time = time ? time : 12;

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const timeStr = `${time}:${minutesStr} ${ampm}`;

  return ` ${timeStr}`;
};

const PreviewTime = ({ timeStamp }: { timeStamp: string }) => {
  const date = new Date(timeStamp);

  const hours = date.getHours();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "pm" : "am";

  let time = hours % 12;

  time = time ? time : 12;

  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const timeStr = `${time}:${minutesStr} ${ampm}`;

  return `${day} ${MonthHashMap[month]} ${year} ${timeStr}`;
};

export { DateAndtime, PreviewTime, timeStampFormatter };
