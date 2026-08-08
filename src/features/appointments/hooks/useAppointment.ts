import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";

interface UseAppointmentOptions {
  enabled?: boolean;
}

export function useAppointment(id: number, options: UseAppointmentOptions = {}) {
  return useQuery({
    queryKey: appointmentsKeys.detail(id),
    queryFn: () => getAppointmentById(id),
    enabled: options.enabled ?? true,
  });
}
