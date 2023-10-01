export const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(":");
  if (time24.includes("AM") || time24.includes("PM")) {
    return `${hours}` + `:${minutes}`;
  }

  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
    if (hours < 10) {
      return `0${hours}` + `:${minutes} ${period}`;
    }
  }
  return `${hours}` + `:${minutes} ${period}`;
};

export const convertToDigit = (num) => {
  if (isNaN(num)) return num;
  let k = Number(num);
  if (k < 10) {
    return "0" + k.toString();
  }
  return k;
};
