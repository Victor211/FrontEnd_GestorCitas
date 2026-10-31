import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";

import { permanentDeleteCustomer } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";

export function usePermanentDeleteCustomer() {
  const queryClient = useQueryClient();

  // También tras un error (404/409) para reflejar el estado real del servidor.
  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    void queryClient.invalidateQueries({ queryKey: customersKeys.byPhoneRoot() });
  };

  return useMutation({
    mutationFn: permanentDeleteCustomer,
    onSuccess: invalidate,
    onError: invalidate,
  });
}
