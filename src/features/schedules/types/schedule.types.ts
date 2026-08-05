export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Schedule {
  id: number;
  employeeId: number;
  employeeName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleRequest {
  employeeId: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export type UpdateScheduleRequest = CreateScheduleRequest;

export interface ScheduleDay {
  day: DayOfWeek;
  schedules: Schedule[];
}

export interface ScheduleFormValues {
  employeeId: number;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export interface ScheduleFilters {
  employeeId?: number;
}
