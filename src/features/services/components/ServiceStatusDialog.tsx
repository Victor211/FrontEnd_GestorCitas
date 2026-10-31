import {
  StatusChangeDialog,
  type StatusAction,
  type StatusChangeCopy,
} from "../../../components/feedback/StatusChangeDialog";
import { useServiceStatus } from "../hooks/useServiceStatus";
import type { Service } from "../types/service.types";

const COPY: StatusChangeCopy = {
  entityLabel: "Servicio",
  deactivateTitle: "Desactivar servicio",
  deactivateDescription:
    "¿Deseás desactivar este servicio? No estará disponible para nuevas reservas, pero conservará su historial.",
  activateTitle: "Activar servicio",
  activateDescription:
    "¿Deseás activar este servicio? Volverá a estar disponible para nuevas reservas, según su configuración.",
};

export interface ServiceStatusTarget {
  service: Service;
  action: StatusAction;
}

interface ServiceStatusDialogProps {
  target: ServiceStatusTarget | null;
  onClose: () => void;
  onNotify: (message: string, severity?: "success" | "info") => void;
}

export function ServiceStatusDialog({ target, onClose, onNotify }: ServiceStatusDialogProps) {
  const mutation = useServiceStatus();

  return (
    <StatusChangeDialog
      target={target ? { id: target.service.id, name: target.service.name } : null}
      action={target?.action ?? "deactivate"}
      copy={COPY}
      mutation={mutation}
      onClose={onClose}
      onNotify={onNotify}
    />
  );
}
