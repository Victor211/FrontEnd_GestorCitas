import {
  StatusChangeDialog,
  type StatusAction,
  type StatusChangeCopy,
} from "../../../components/feedback/StatusChangeDialog";
import { useEmployeeStatus } from "../hooks/useEmployeeStatus";
import type { Employee } from "../types/employee.types";

const COPY: StatusChangeCopy = {
  entityLabel: "Empleado",
  deactivateTitle: "Desactivar empleado",
  deactivateDescription:
    "¿Deseás desactivar este empleado? No podrá recibir nuevas reservas, pero se conservará su historial.",
  activateTitle: "Activar empleado",
  activateDescription:
    "¿Deseás activar este empleado? Volverá a estar disponible para nuevas reservas. Debe tener al menos un servicio activo asignado.",
};

export interface EmployeeStatusTarget {
  employee: Employee;
  action: StatusAction;
}

interface EmployeeStatusDialogProps {
  target: EmployeeStatusTarget | null;
  onClose: () => void;
  onNotify: (message: string, severity?: "success" | "info") => void;
}

export function EmployeeStatusDialog({ target, onClose, onNotify }: EmployeeStatusDialogProps) {
  const mutation = useEmployeeStatus();

  return (
    <StatusChangeDialog
      target={
        target
          ? {
              id: target.employee.id,
              name: `${target.employee.firstName} ${target.employee.lastName}`,
            }
          : null
      }
      action={target?.action ?? "deactivate"}
      copy={COPY}
      mutation={mutation}
      onClose={onClose}
      onNotify={onNotify}
    />
  );
}
