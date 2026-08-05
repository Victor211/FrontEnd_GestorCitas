import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { createCustomer } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: customersKeys.byPhoneRoot() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
