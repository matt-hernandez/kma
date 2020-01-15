import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import { PartnerUpDeadline } from '../apollo-client/types/user';

export function formatDate(date: number) {
  const d = utcToZonedTime(new Date(date), TIME_ZONE);
  return format(d, 'M/d/yyyy \'at\' h:mm a', { timeZone: TIME_ZONE });
}

export function formatDueDate(date: number) {
  return `Due on ${formatDate(date)}`;
}

export function formatPublishDate(date: number) {
  return `Will publish on ${formatDate(date)}`;
}

export function getPartnerUpDeadlineInMilliseconds(partnerUpDeadline: PartnerUpDeadline): number {
  if (partnerUpDeadline === 'TWO_HOURS') {
    return ONE_HOUR_MILLISECONDS * 2;
  } else if (partnerUpDeadline === 'SIX_HOURS') {
    return ONE_HOUR_MILLISECONDS * 6;
  } else if (partnerUpDeadline === 'TWELVE_HOURS') {
    return ONE_HOUR_MILLISECONDS * 12;
  } else if (partnerUpDeadline === 'ONE_DAY') {
    return ONE_DAY_MILLISECONDS;
  } else if (partnerUpDeadline === 'ONE_WEEK') {
    return ONE_DAY_MILLISECONDS * 7;
  }
  return ONE_HOUR_MILLISECONDS;
}

export function getPartnerUpDeadlineEpochFromDue(due: number, partnerUpDeadline: PartnerUpDeadline): number {
  if (partnerUpDeadline === 'TWO_HOURS') {
    return due - ONE_HOUR_MILLISECONDS * 2;
  } else if (partnerUpDeadline === 'SIX_HOURS') {
    return due - ONE_HOUR_MILLISECONDS * 6;
  } else if (partnerUpDeadline === 'TWELVE_HOURS') {
    return due - ONE_HOUR_MILLISECONDS * 12;
  } else if (partnerUpDeadline === 'ONE_DAY') {
    return due - ONE_DAY_MILLISECONDS;
  } else if (partnerUpDeadline === 'ONE_WEEK') {
    return due - ONE_DAY_MILLISECONDS * 7;
  }
  return due - ONE_HOUR_MILLISECONDS;
}

export function formatCommitAndPartnerDate(due: number, partnerUpDeadline: PartnerUpDeadline) {
  const date = getPartnerUpDeadlineEpochFromDue(due, partnerUpDeadline);
  return `Enroll by ${formatDate(date)}`;
}

export function isBeforeNow(date: number, milliseconds: number) {
  return date - milliseconds < TODAY_MILLISECONDS_ZONED;
}

export function getUTCTimeInMilliseconds(date: number | string) {
  return zonedTimeToUtc(date, TIME_ZONE).getTime();
}

export function getZonedDate(date: number): Date {
  return utcToZonedTime(new Date(date), TIME_ZONE);
}

export const TIME_ZONE = 'America/Chicago';

export const ONE_MINUTE_MILLISECONDS = 60000;

export const ONE_HOUR_MILLISECONDS = 3600000;

export const ONE_DAY_MILLISECONDS = 3600000 * 24;

const TODAY_DATE_ZONED = utcToZonedTime(new Date(), TIME_ZONE);
export const TODAY_ISO_STRING = TODAY_DATE_ZONED.toISOString();
export const TODAY_MILLISECONDS_ZONED = TODAY_DATE_ZONED.getTime(); // Always returns milliseconds since epoch in Central Time
export const TIME_ZONE_DIFFERENCE = (TODAY_DATE_ZONED.getHours() - TODAY_DATE_ZONED.getUTCHours()) * ONE_HOUR_MILLISECONDS; // Time difference between UTC and Central Time

let tomorrow = new Date(TODAY_MILLISECONDS_ZONED);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(12, 0, 0, 0);
export const TOMORROW_AT_NOON_MILLISECONDS_ZONED = tomorrow.getTime();
