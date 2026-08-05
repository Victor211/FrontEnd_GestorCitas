import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useDeleteService } from "../hooks/useDeleteService";
import type { Service } from "../types/service.types";

interface DeleteServiceDialogProps {
  service: Service | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function DeleteServiceDialog({
  service,
  onClose,
  onSuccess,
}: DeleteServiceDialogProps) {
  const deleteMutation = useDeleteService();

  const handleClose = () => {
    if (deleteMutation.isPending) {
      return;
    }
    deleteMutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!service) {
      return;
    }

    deleteMutation.mutate(service.id, {
      onSuccess: () => {
        onSuccess(`Servicio "${service.name}" eliminado correctamente.`);
        onClose();
      },
    });
  };

  return (
    <ConfirmDialog
      open={service !== null}
      title="Eliminar servicio"
      description={
        service
          ? `¿Deseás eliminar el servicio "${service.name}"? Dejará de aparecer en los listados y no podrá asignarse a nuevas citas.`
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
