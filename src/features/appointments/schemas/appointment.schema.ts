import dayjs from "dayjs";
import { z } from "zod";
import type {
  AppointmentFormValues,
  CreateAppointmentRequest,
} from "../types/appointment.types";
import { localDateTimeToInstant } from "../utils/dateConversion";

const FUTURE_DATETIME_MESSAGE = "La fecha y hora deben ser futuras.";

function isFutureLocalDateTime(value: string): boolean {
  return dayjs(value).isAfter(dayjs());
}

export const appointmentSchema = z
  .object({
    customerId: z.number().int().positive("Seleccioná un cliente."),
    employeeId: z.number().int().positive("Seleccioná un empleado."),
    serviceId: z.number().int().positive("Seleccioná un servicio."),
    startAt: z.string().min(1, "La fecha y hora son obligatorias."),
    notes: z.string().trim().max(500, "Las notas no pueden superar los 500 caracteres."),
  })
  .refine((values) => isFutureLocalDateTime(values.startAt), {
    message: FUTURE_DATETIME_MESSAGE,
    path: ["startAt"],
  });

export const appointmentFormDefaultValues: AppointmentFormValues = {
  customerId: 0,
  employeeId: 0,
  serviceId: 0,
  startAt: "",
  notes: "",
};

export function normalizeAppointmentPayload(
  values: AppointmentFormValues,
): CreateAppointmentRequest {
  return {
    customerId: values.customerId,
    employeeId: values.employeeId,
    serviceId: values.serviceId,
    startAt: localDateTimeToInstant(values.startAt),
    notes: values.notes.trim() ? values.notes.trim() : undefined,
  };
}

export const rescheduleSchema = z
  .object({
    newStartAt: z.string().min(1, "La fecha y hora son obligatorias."),
  })
  .refine((values) => isFutureLocalDateTime(values.newStartAt), {
    message: FUTURE_DATETIME_MESSAGE,
    path: ["newStartAt"],
  });

export type RescheduleFormValues = z.infer<typeof rescheduleSchema>;
