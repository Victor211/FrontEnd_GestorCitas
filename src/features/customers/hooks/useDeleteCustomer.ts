import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { deleteCustomer } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: customersKeys.byPhoneRoot() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
