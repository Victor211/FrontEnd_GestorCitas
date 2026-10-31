import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { activateService, deactivateService } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";
import { employeesKeys } from "../../employees/api/employeesKeys";

import type { StatusAction } from "../../../components/feedback/StatusChangeDialog";

export type { StatusAction };

/** Activa o desactiva (lógicamente) un servicio y sincroniza los listados. */
export function useServiceStatus() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
    void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    // Los servicios asignados a un empleado se resumen en el listado de empleados.
    void queryClient.invalidateQueries({ queryKey: employeesKeys.lists() });
  };

  return useMutation({
    mutationFn: ({ id, action }: { id: number; action: StatusAction }) =>
      action === "activate" ? activateService(id) : deactivateService(id),
    onSuccess: invalidate,
    // Un 409 puede significar que el estado real ya cambió: se resincroniza igualmente.
    onError: invalidate,
  });
}
