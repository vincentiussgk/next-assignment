export const timeToString = (hours: number = 1): string => {
  if (!hours || hours <= 1) {
    return "1 hour";
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  const daysText = days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "";
  const hoursText =
    remainingHours > 0
      ? `${remainingHours} hour${remainingHours > 1 ? "s" : ""}`
      : "";

  const result = `${daysText}${daysText && hoursText ? " " : ""}${hoursText}`;

  return result;
};
