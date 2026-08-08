import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { updateAppointmentStatus } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";
import type { UpdateAppointmentStatusRequest } from "../types/appointment.types";

interface UpdateAppointmentStatusVariables {
  id: number;
  request: UpdateAppointmentStatusRequest;
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateAppointmentStatusVariables) =>
      updateAppointmentStatus(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: appointmentsKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: appointmentsKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
