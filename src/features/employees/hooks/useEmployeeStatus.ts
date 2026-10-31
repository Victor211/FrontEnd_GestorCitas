import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import type { StatusAction } from "../../../components/feedback/StatusChangeDialog";
import { activateEmployee, deactivateEmployee } from "../api/employeesApi";
import { employeesKeys } from "../api/employeesKeys";

/** Activa o desactiva (lógicamente) un empleado y sincroniza los listados. */
export function useEmployeeStatus() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
  };

  return useMutation({
    mutationFn: ({ id, action }: { id: number; action: StatusAction }) =>
      action === "activate" ? activateEmployee(id) : deactivateEmployee(id),
    onSuccess: invalidate,
    onError: invalidate,
  });
}
