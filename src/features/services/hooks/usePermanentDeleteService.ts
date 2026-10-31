import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { employeesKeys } from "../../employees/api/employeesKeys";
import { permanentDeleteService } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";

export function usePermanentDeleteService() {
  const queryClient = useQueryClient();

  // También tras un error (404/409) para reflejar el estado real del servidor.
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    void queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
  };

  return useMutation({
    mutationFn: permanentDeleteService,
    onSuccess: invalidate,
    onError: invalidate,
  });
}
