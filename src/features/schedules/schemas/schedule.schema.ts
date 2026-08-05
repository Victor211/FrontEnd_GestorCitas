import { z } from "zod";
import type {
  CreateScheduleRequest,
  Schedule,
  ScheduleFormValues,
} from "../types/schedule.types";
import { formatScheduleTime } from "../utils/scheduleTime";

const DAY_OF_WEEK_VALUES = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export const scheduleSchema = z
  .object({
    employeeId: z.number().int().positive("Seleccioná un empleado válido."),
    dayOfWeek: z.enum(DAY_OF_WEEK_VALUES, "Seleccioná un día válido."),
    startTime: z.string().regex(TIME_REGEX, "La hora de inicio es obligatoria."),
    endTime: z.string().regex(TIME_REGEX, "La hora de fin es obligatoria."),
  })
  .refine((values) => values.startTime < values.endTime, {
    message: "La hora de fin debe ser posterior a la hora de inicio.",
    path: ["endTime"],
  });

export function toScheduleFormValues(schedule: Schedule): ScheduleFormValues {
  return {
    employeeId: schedule.employeeId,
    dayOfWeek: schedule.dayOfWeek,
    startTime: formatScheduleTime(schedule.startTime),
    endTime: formatScheduleTime(schedule.endTime),
  };
}

export function normalizeSchedulePayload(
  values: ScheduleFormValues,
): CreateScheduleRequest {
  return {
    employeeId: values.employeeId,
    dayOfWeek: values.dayOfWeek,
    startTime: `${values.startTime}:00`,
    endTime: `${values.endTime}:00`,
  };
}
