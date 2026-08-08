import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { rescheduleAppointment } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";
import type { RescheduleAppointmentRequest } from "../types/appointment.types";

interface RescheduleAppointmentVariables {
  id: number;
  request: RescheduleAppointmentRequest;
}

export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: RescheduleAppointmentVariables) =>
      rescheduleAppointment(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: appointmentsKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: appointmentsKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
