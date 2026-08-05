import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { updateEmployee } from "../api/employeesApi";
import { employeesKeys } from "../api/employeesKeys";
import type { UpdateEmployeeRequest } from "../types/employee.types";

interface UpdateEmployeeVariables {
  id: number;
  request: UpdateEmployeeRequest;
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateEmployeeVariables) =>
      updateEmployee(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: employeesKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
