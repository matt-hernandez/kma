export const oneHour = 3600000;

export const oneDay = 3600000 * 24;

export function formatDate(date: number) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours() % 12 === 0 ? 12 : d.getHours() % 12;
  const minute = `0${d.getMinutes()}`.slice(-2);
  const amOrPm = d.getHours() >= 12 ? 'PM' : 'AM';
  return `${month}/${day}/${year} at ${hour}:${minute} ${amOrPm}`;
}

export function formatDueDate(date: number) {
  return `Due on ${formatDate(date)}`;
}

export function formatCommitAndPartnerDate(date: number) {
  return `Partner-up by ${formatDate(date)}`;
}
