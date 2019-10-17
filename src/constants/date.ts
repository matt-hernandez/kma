import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export const TIME_ZONE = 'America/Chicago';
const UTC_TIME_ZONE = 'Etc/UTC';

export const ONE_MINUTE_MILLISECONDS = 60000;

export const ONE_HOUR_MILLISECONDS = 3600000;

export const ONE_DAY_MILLISECONDS = 3600000 * 24;

export const TODAY_DATE_ZONED = utcToZonedTime(new Date(), TIME_ZONE);
export const TODAY_MILLISECONDS_ZONED = TODAY_DATE_ZONED.getTime(); // Always returns milliseconds since epoch in Central Time
export const TIME_ZONE_DIFFERENCE = (TODAY_DATE_ZONED.getHours() - TODAY_DATE_ZONED.getUTCHours()) * ONE_HOUR_MILLISECONDS; // Time difference between UTC and Central Time

let tomorrow = new Date(TODAY_MILLISECONDS_ZONED);
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(12, 0, 0, 0);
export const TOMORROW_AT_NOON_MILLISECONDS_ZONED = tomorrow.getTime();
