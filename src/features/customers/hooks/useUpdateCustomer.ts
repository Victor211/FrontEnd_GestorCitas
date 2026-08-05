import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { updateCustomer } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";
import type { UpdateCustomerRequest } from "../types/customer.types";

interface UpdateCustomerVariables {
  id: number;
  request: UpdateCustomerRequest;
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateCustomerVariables) =>
      updateCustomer(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: customersKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: customersKeys.byPhoneRoot() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
