import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { createAppointment } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: appointmentsKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
