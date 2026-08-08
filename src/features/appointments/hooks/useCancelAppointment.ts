import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { cancelAppointment } from "../api/appointmentsApi";
import { appointmentsKeys } from "../api/appointmentsKeys";

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: (_data, id) => {
      void queryClient.invalidateQueries({ queryKey: appointmentsKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: appointmentsKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
