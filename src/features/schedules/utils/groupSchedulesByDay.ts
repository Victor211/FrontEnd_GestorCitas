import type { Schedule, ScheduleDay } from "../types/schedule.types";
import { DAYS_OF_WEEK } from "./daysOfWeek";

export function groupSchedulesByDay(schedules: Schedule[]): ScheduleDay[] {
  return DAYS_OF_WEEK.map((dayConfig) => ({
    day: dayConfig.value,
    schedules: schedules
      .filter((schedule) => schedule.dayOfWeek === dayConfig.value)
      .slice()
      .sort((a, b) => (a.startTime < b.startTime ? -1 : a.startTime > b.startTime ? 1 : 0)),
  }));
}
