export function formatDueDate(date: number) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours() % 12;
  const minute = `0${d.getMinutes()}`.slice(-2);
  const amOrPm = d.getHours() >= 12 ? 'PM' : 'AM';
  return `Due on ${month}/${day}/${year} at ${hour}:${minute} ${amOrPm}`;
}
