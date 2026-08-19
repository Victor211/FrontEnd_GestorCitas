import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";
import type { Customer } from "../types/customer.types";

interface DeleteCustomerDialogProps {
  customer: Customer | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function DeleteCustomerDialog({
  customer,
  onClose,
  onSuccess,
}: DeleteCustomerDialogProps) {
  const deleteMutation = useDeleteCustomer();

  const handleClose = () => {
    if (deleteMutation.isPending) {
      return;
    }
    deleteMutation.reset();
    onClose();
  };

  const customerName = customer
    ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()
    : "";

  const handleConfirm = () => {
    if (!customer) {
      return;
    }

    deleteMutation.mutate(customer.id, {
      onSuccess: () => {
        onSuccess(`Cliente "${customerName}" eliminado correctamente.`);
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      open={customer !== null}
      title="Eliminar cliente"
      description={
        customer
          ? `¿Deseás eliminar al cliente "${customerName}"? Dejará de aparecer en los listados, no se eliminará físicamente su historial y no estará disponible para nuevas operaciones.`
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
