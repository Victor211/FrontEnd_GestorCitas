const APPOINTMENT_VIEW_MODE_KEY = "appointment-view-mode";

export type AppointmentViewMode = "calendar" | "list";

function isAppointmentViewMode(value: string | null): value is AppointmentViewMode {
  return value === "calendar" || value === "list";
}

function getAppointmentViewMode(): AppointmentViewMode {
  const stored = localStorage.getItem(APPOINTMENT_VIEW_MODE_KEY);
  return isAppointmentViewMode(stored) ? stored : "calendar";
}

function setAppointmentViewMode(mode: AppointmentViewMode): void {
  localStorage.setItem(APPOINTMENT_VIEW_MODE_KEY, mode);
}

export const appointmentViewPreference = {
  getAppointmentViewMode,
  setAppointmentViewMode,
};
