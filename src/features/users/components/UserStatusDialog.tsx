import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { useUpdateUserStatus } from "../hooks/useUpdateUserStatus";
import type { ManagedUser } from "../types/user.types";
import { getUpdateStatusErrorMessage } from "../utils/userDisplay";

interface UserStatusDialogProps {
  user: ManagedUser | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

// Confirma el cambio al estado opuesto al actual del usuario.
export function UserStatusDialog({ user, onClose, onSuccess }: UserStatusDialogProps) {
  const statusMutation = useUpdateUserStatus();

  const handleClose = () => {
    if (statusMutation.isPending) {
      return;
    }
    statusMutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!user) {
      return;
    }

    const nextActive = !user.active;
    statusMutation.mutate(
      { id: user.id, active: nextActive },
      {
        onSuccess: () => {
          onSuccess(
            `Usuario "${user.firstName} ${user.lastName}" ${nextActive ? "activado" : "desactivado"} correctamente.`,
          );
          onClose();
        },
      },
    );
  };

  const deactivating = user?.active ?? false;
  const userName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <ConfirmDialog
      open={user !== null}
      title={deactivating ? "Desactivar usuario" : "Activar usuario"}
      description={
        deactivating
          ? `¿Deseás desactivar a "${userName}"? No podrá iniciar sesión y su sesión actual dejará de ser válida.`
          : `¿Deseás activar a "${userName}"? Podrá volver a iniciar sesión.`
      }
      confirmLabel={deactivating ? "Desactivar" : "Activar"}
      confirmColor={deactivating ? "error" : "primary"}
      loading={statusMutation.isPending}
      error={statusMutation.isError ? getUpdateStatusErrorMessage(statusMutation.error) : null}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
