export const datePickerToString = (date?: string | undefined) => {
  if (!date) return "01-01-1970 00:00";
  const dateObject = new Date(date);
  return `${
    dateObject.getUTCDate() < 10 ? "0" : ""
  }${dateObject.getUTCDate()}-${dateObject.getUTCMonth() + 1 < 10 ? "0" : ""}${
    dateObject.getUTCMonth() + 1
  }-${dateObject.getUTCFullYear()}
    ${dateObject.getHours()}:${
    dateObject.getMinutes() < 10 ? "0" : ""
  }${dateObject.getMinutes()}
  `;
};
