import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LOCALE_DEFAULT, LOCALES } from "@/lib/constants/locales";

import "dayjs/locale/en";
import "dayjs/locale/fr";

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const TIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT_SHORT = "HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_TIME_FORMAT = "dddd, D MMMM YYYY HH:mm:ss UTC Z";
export const DATE_TIME_FORMAT_SHORT = "MMMM YYYY HH:mm UTC Z";

export function parseDateTime(date?: string): dayjs.Dayjs | undefined {
  if (date && date.length > 0) {
    return dayjs(date);
  }
  return undefined;
}

export function parseTime(time?: string): dayjs.Dayjs | undefined {
  if (time && time.length > 0) {
    return dayjs(time, TIME_FORMAT);
  }
  return undefined;
}

export function parseTimeShort(time?: string): dayjs.Dayjs | undefined {
  if (time && time.length > 0) {
    return dayjs(time, TIME_FORMAT_SHORT);
  }
  return undefined;
}

export function formatDateTime(date?: string): string {
  if (date && date.length > 0) {
    // Convert UTC date to local timezone
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = dayjs.utc(date).tz(localTz);

    return dayjs(localDate).format(DATE_TIME_FORMAT).toString();
  }
  return "";
}

export function formatDateTimeShort(date?: string): string {
  if (date && date.length > 0) {
    // Convert UTC date to local timezone
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = dayjs.utc(date).tz(localTz);

    return dayjs(localDate).format(DATE_TIME_FORMAT_SHORT).toString();
  }
  return "";
}

export function formatDate(date?: string): string {
  if (date && date.length > 0) {
    // Convert UTC date to local timezone
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = dayjs.utc(date).tz(localTz);

    return dayjs(localDate).format(DATE_FORMAT).toString();
  }
  return "";
}

export function formatTime(time?: string): string {
  if (time && time.length > 0) {
    return dayjs(time).format(TIME_FORMAT).toString();
  }
  return "";
}

export function formatTimeShort(time?: string): string {
  if (time && time.length > 0) {
    return dayjs(time).format(TIME_FORMAT_SHORT).toString();
  }
  return "";
}

export function formatDateTimeToSince(date?: string): string {
  if (date && date.length > 0) {
    // Convert UTC date to local timezone
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = dayjs.utc(date).tz(localTz);

    return dayjs(localDate).fromNow().toString();
  }
  return "";
}

export function formatDateTimeToUnix(date?: string): number {
  if (date && date.length > 0) {
    return dayjs(formatDateTime(date)).unix();
  }
  return dayjs().unix();
}

export function setDateTimeLocaleLanguage(locale?: string) {
  if (!locale) {
    return;
  }
  let newLocale = LOCALE_DEFAULT;
  if (LOCALES.includes(locale) === true) {
    newLocale = locale;
  }
  dayjs.locale(newLocale);
}
