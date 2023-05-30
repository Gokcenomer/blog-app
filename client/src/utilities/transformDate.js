export function transformDate(date) {
  date = new Date(date);
  return date.toDateString();
}
