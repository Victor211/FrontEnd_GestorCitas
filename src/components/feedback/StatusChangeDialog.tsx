import type { UseMutationResult } from "@tanstack/react-query";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { isAlreadyInStateError } from "../../utils/statusMutationError";
import { ConfirmDialog } from "./ConfirmDialog";

export type StatusAction = "activate" | "deactivate";

export interface StatusChangeTarget {
  id: number;
  /** Nombre mostrado en las notificaciones. */
  name: string;
}

export interface StatusChangeCopy {
  deactivateTitle: string;
  deactivateDescription: string;
  activateTitle: string;
  activateDescription: string;
  /** Ej.: "Servicio" → `Servicio "X" desactivado correctamente.` */
  entityLabel: string;
}

type StatusMutation = UseMutationResult<
  void,
  Error,
  { id: number; action: StatusAction }
>;

interface StatusChangeDialogProps {
  target: StatusChangeTarget | null;
  action: StatusAction;
  copy: StatusChangeCopy;
  mutation: StatusMutation;
  onClose: () => void;
  onNotify: (message: string, severity?: "success" | "info") => void;
}

/** Confirmación para activar/desactivar un registro (Servicios y Empleados). */
export function StatusChangeDialog({
  target,
  action,
  copy,
  mutation,
  onClose,
  onNotify,
}: StatusChangeDialogProps) {
  const isActivate = action === "activate";

  const handleClose = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!target) {
      return;
    }

    mutation.mutate(
      { id: target.id, action },
      {
        onSuccess: () => {
          onNotify(
            `${copy.entityLabel} "${target.name}" ${
              isActivate ? "activado" : "desactivado"
            } correctamente.`,
          );
          mutation.reset();
          onClose();
        },
        onError: (error) => {
          // El registro ya estaba en el estado pedido: el listado se resincroniza.
          if (isAlreadyInStateError(error)) {
            onNotify(getApiErrorMessage(error), "info");
            mutation.reset();
            onClose();
          }
        },
      },
    );
  };

  return (
    <ConfirmDialog
      open={target !== null}
      title={isActivate ? copy.activateTitle : copy.deactivateTitle}
      description={isActivate ? copy.activateDescription : copy.deactivateDescription}
      confirmLabel={isActivate ? "Activar" : "Desactivar"}
      cancelLabel="Cancelar"
      confirmColor={isActivate ? "primary" : "error"}
      loading={mutation.isPending}
      error={mutation.isError ? getApiErrorMessage(mutation.error) : null}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
