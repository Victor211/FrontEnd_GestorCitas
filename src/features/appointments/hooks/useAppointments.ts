import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAppointments } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";
import type { AppointmentFilters } from "../types/appointment.types";

interface UseAppointmentsOptions {
  enabled?: boolean;
}

export function useAppointments(filters: AppointmentFilters, options: UseAppointmentsOptions = {}) {
  return useQuery({
    queryKey: appointmentsKeys.list(filters),
    queryFn: () => getAppointments(filters),
    placeholderData: keepPreviousData,
    enabled: options.enabled ?? true,
  });
}
