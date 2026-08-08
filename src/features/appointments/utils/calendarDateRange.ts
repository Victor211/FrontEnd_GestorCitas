import dayjs from "dayjs";
import { instantToLocalDateTimeInput } from "./dateConversion";

export interface CalendarDateRange {
  from: string;
  to: string;
}

export function toCalendarDateRange(start: Date, end: Date): CalendarDateRange {
  return {
    from: dayjs(start).toISOString(),
    to: dayjs(end).toISOString(),
  };
}

export function calendarDateToInstant(date: Date): string {
  return dayjs(date).toISOString();
}

export function calendarDateToLocalInput(date: Date): string {
  return instantToLocalDateTimeInput(calendarDateToInstant(date));
}
