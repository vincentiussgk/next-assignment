export const datePickerToStringMonth = (date: number) => {
  if (!date) return "1 January 1970 00:00";
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObject = new Date(date);
  return `${
    dateObject.getUTCDate() < 10 ? "0" : ""
  }${dateObject.getUTCDate()} ${
    months[dateObject.getUTCMonth() + 1]
  } ${dateObject.getUTCFullYear()}
    ${dateObject.getHours()}:${
    dateObject.getMinutes() < 10 ? "0" : ""
  }${dateObject.getMinutes()}
  `;
};
