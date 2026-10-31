import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";

import { permanentDeleteEmployee } from "../api/employeesApi";
import { employeesKeys } from "../api/employeesKeys";

export function usePermanentDeleteEmployee() {
  const queryClient = useQueryClient();

  // También tras un error (404/409) para reflejar el estado real del servidor.
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });

  };

  return useMutation({
    mutationFn: permanentDeleteEmployee,
    onSuccess: invalidate,
    onError: invalidate,
  });
}
