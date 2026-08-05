import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useDeleteEmployee } from "../hooks/useDeleteEmployee";
import type { Employee } from "../types/employee.types";

interface DeleteEmployeeDialogProps {
  employee: Employee | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function DeleteEmployeeDialog({
  employee,
  onClose,
  onSuccess,
}: DeleteEmployeeDialogProps) {
  const deleteMutation = useDeleteEmployee();

  const handleClose = () => {
    if (deleteMutation.isPending) {
      return;
    }
    deleteMutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!employee) {
      return;
    }

    deleteMutation.mutate(employee.id, {
      onSuccess: () => {
        onSuccess(
          `Empleado "${employee.firstName} ${employee.lastName}" eliminado correctamente.`,
        );
        onClose();
      },
    });
  };

  const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : "";

  return (
    <ConfirmDialog
      open={employee !== null}
      title="Eliminar empleado"
      description={
        employee
          ? `¿Deseás eliminar al empleado "${employeeName}"? Dejará de aparecer en los listados y no estará disponible para nuevas citas.`
          : ""
      }
      confirmLabel="Eliminar"
      cancelLabel="Cancelar"
      confirmColor="error"
      loading={deleteMutation.isPending}
      error={deleteMutation.isError ? getApiErrorMessage(deleteMutation.error) : null}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
