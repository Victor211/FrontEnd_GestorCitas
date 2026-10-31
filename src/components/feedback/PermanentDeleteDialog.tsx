import type { UseMutationResult } from "@tanstack/react-query";
import { isApiError } from "../../utils/getApiErrorMessage";
import { ConfirmDialog } from "./ConfirmDialog";

const GENERIC_ERROR = "No se pudo completar la eliminación. Intentá nuevamente.";
const FORBIDDEN_ERROR = "No tenés permisos para realizar esta operación.";
const NOT_FOUND_ERROR = "El registro ya no existe o no está disponible.";
const CONFLICT_FALLBACK =
  "No se puede eliminar definitivamente este registro porque tiene citas o dependencias asociadas.";

/** Traduce el error HTTP a un mensaje seguro para el usuario (sin detalles internos). */
function getPermanentDeleteErrorMessage(error: unknown): string {
  if (!isApiError(error)) {
    return GENERIC_ERROR;
  }
  switch (error.status) {
    case 409:
      return error.message?.trim() || CONFLICT_FALLBACK;
    case 403:
      return FORBIDDEN_ERROR;
    case 404:
      return NOT_FOUND_ERROR;
    default:
      return GENERIC_ERROR;
  }
}

export interface PermanentDeleteTarget {
  id: number;
  name: string;
}

interface PermanentDeleteDialogProps {
  target: PermanentDeleteTarget | null;
  /** Ej.: "Servicio" → "Servicio eliminado definitivamente." */
  successMessage: string;
  mutation: UseMutationResult<void, Error, number>;
  onClose: () => void;
  onNotify: (message: string, severity?: "success" | "info") => void;
}

/** Confirmación para eliminar definitivamente un registro. */
export function PermanentDeleteDialog({
  target,
  successMessage,
  mutation,
  onClose,
  onNotify,
}: PermanentDeleteDialogProps) {
  const handleClose = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!target || mutation.isPending) {
      return;
    }

    mutation.mutate(target.id, {
      onSuccess: () => {
        onNotify(successMessage);
        mutation.reset();
        onClose();
      },
      onError: (error) => {
        // El registro ya no existe: el listado se actualiza y no hay nada más que confirmar.
        if (isApiError(error) && error.status === 404) {
          onNotify(NOT_FOUND_ERROR, "info");
          mutation.reset();
          onClose();
        }
      },
    });
  };

  return (
    <ConfirmDialog
      open={target !== null}
      title="¿Eliminar definitivamente?"
      description={
        (target ? `${target.name}\n\n` : "") +
        "Esta acción eliminará permanentemente el registro y no se podrá deshacer. Si tiene citas u otras dependencias que impidan su eliminación, la operación será rechazada."
      }
      confirmLabel="Eliminar definitivamente"
      cancelLabel="Cancelar"
      confirmColor="error"
      loading={mutation.isPending}
      error={mutation.isError ? getPermanentDeleteErrorMessage(mutation.error) : null}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
