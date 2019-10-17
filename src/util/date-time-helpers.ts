import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { TIME_ZONE, TODAY_MILLISECONDS_ZONED } from '../constants/date';

export function formatDate(date: number) {
  const d = utcToZonedTime(new Date(date), TIME_ZONE);
  return format(d, 'M/d/yyyy \'at\' h:mm a', { timeZone: TIME_ZONE });
}

export function formatDueDate(date: number) {
  return `Due on ${formatDate(date)}`;
}

export function formatCommitAndPartnerDate(date: number) {
  return `Partner-up by ${formatDate(date)}`;
}

export function isBeforeNow(date: number, milliseconds: number) {
  return date - milliseconds < TODAY_MILLISECONDS_ZONED;
}

export function getUTCTimeInMilliseconds(date: number | string) {
  return zonedTimeToUtc(date, TIME_ZONE).getTime();
}
