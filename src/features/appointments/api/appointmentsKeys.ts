import type { AppointmentFilters } from "../types/appointment.types";

export const appointmentsKeys = {
  all: ["appointments"] as const,
  lists: () => [...appointmentsKeys.all, "list"] as const,
  list: (filters: AppointmentFilters) => [...appointmentsKeys.lists(), filters] as const,
  details: () => [...appointmentsKeys.all, "detail"] as const,
  detail: (id: number) => [...appointmentsKeys.details(), id] as const,
};
