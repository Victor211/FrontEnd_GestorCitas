import type { EventInput } from "@fullcalendar/core";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import type { AppointmentCalendarEventProps } from "../types/calendarEvent.types";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";
import type { EmployeeColorMap } from "./employeeColorMap";

const STATUS_CLASS_NAMES: Record<AppointmentStatus, string[]> = {
  PENDING: ["fc-appointment-pending"],
  CONFIRMED: [],
  CANCELLED: ["fc-appointment-cancelled"],
  COMPLETED: ["fc-appointment-completed"],
  NO_SHOW: ["fc-appointment-no-show"],
};

export function getAppointmentAriaLabel(appointment: Appointment): string {
  const statusLabel = getAppointmentStatusConfig(appointment.status).label;
  return `Cita de ${appointment.customerName}, ${appointment.serviceName}, con ${appointment.employeeName}, de ${formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}, ${formatAppointmentDate(appointment.startAt)}, estado ${statusLabel}.`;
}

export function mapAppointmentToCalendarEvent(
  appointment: Appointment,
  employeeColors: EmployeeColorMap,
  fallbackColor: string,
): EventInput {
  const color = employeeColors.get(appointment.employeeId) ?? fallbackColor;
  const extendedProps: AppointmentCalendarEventProps = { appointment };

  return {
    id: String(appointment.id),
    title: `${appointment.customerName} · ${appointment.serviceName}`,
    start: appointment.startAt,
    end: appointment.endAt,
    backgroundColor: color,
    borderColor: color,
    classNames: STATUS_CLASS_NAMES[appointment.status],
    extendedProps,
  };
}
