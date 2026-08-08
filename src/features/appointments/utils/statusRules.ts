import type { AppointmentStatus } from "../types/appointment.types";

interface AppointmentStatusRules {
  canReschedule: boolean;
  canCancel: boolean;
  canChangeStatus: boolean;
}

const STATUS_RULES: Record<AppointmentStatus, AppointmentStatusRules> = {
  PENDING: { canReschedule: true, canCancel: true, canChangeStatus: true },
  CONFIRMED: { canReschedule: true, canCancel: true, canChangeStatus: true },
  CANCELLED: { canReschedule: false, canCancel: false, canChangeStatus: false },
  COMPLETED: { canReschedule: false, canCancel: false, canChangeStatus: false },
  NO_SHOW: { canReschedule: false, canCancel: false, canChangeStatus: false },
};

export function getAppointmentStatusRules(status: AppointmentStatus): AppointmentStatusRules {
  return STATUS_RULES[status];
}
