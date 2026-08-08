import dayjs from "dayjs";

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
