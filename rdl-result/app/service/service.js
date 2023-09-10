import axios from "axios";
const instance = axios.create({
  baseURL: URL, // Set your API base URL here
  timeout: 10000, // Set timeout as needed
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClientCurrentData = async (date) => {
  try {
    const response = await instance.post("/getClientCurrentData", { date });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export const getShareUrl = async () => {
  try {
    const apiKey = "https://rdl-result.com/api";
    axios.get(apiKey + "/getSharingData").then((response) => {
      return response?.data;
    });
  } catch (e) {
    console.log(e);
  }
};

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
