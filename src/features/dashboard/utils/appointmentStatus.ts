import type { ChipProps } from "@mui/material";
import type { AppointmentStatus } from "../types/dashboard.types";

interface AppointmentStatusConfig {
  label: string;
  color: NonNullable<ChipProps["color"]>;
}

const APPOINTMENT_STATUS_CONFIG: Record<AppointmentStatus, AppointmentStatusConfig> = {
  PENDING: { label: "Pendiente", color: "warning" },
  CONFIRMED: { label: "Confirmada", color: "info" },
  CANCELLED: { label: "Cancelada", color: "error" },
  COMPLETED: { label: "Completada", color: "success" },
  NO_SHOW: { label: "No asistió", color: "default" },
};

export function getAppointmentStatusConfig(
  status: AppointmentStatus,
): AppointmentStatusConfig {
  return APPOINTMENT_STATUS_CONFIG[status];
}
