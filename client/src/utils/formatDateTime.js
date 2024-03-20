export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return dateTime.toLocaleString("zh-TW", options);
}
