import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import { useCancelAppointment } from "../hooks/useCancelAppointment";
import type { Appointment } from "../types/appointment.types";

interface CancelAppointmentDialogProps {
  appointment: Appointment | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function CancelAppointmentDialog({
  appointment,
  onClose,
  onSuccess,
}: CancelAppointmentDialogProps) {
  const cancelMutation = useCancelAppointment();

  const handleClose = () => {
    if (cancelMutation.isPending) {
      return;
    }
    cancelMutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!appointment) {
      return;
    }

    cancelMutation.mutate(appointment.id, {
      onSuccess: () => {
        onSuccess("Cita cancelada correctamente.");
        onClose();
      },
    });
  };

  const description = appointment
    ? `¿Deseás cancelar esta cita? ${appointment.customerName} · ${formatAppointmentDate(appointment.startAt)} · ${formatAppointmentTimeRange(appointment.startAt, appointment.endAt)} · ${appointment.serviceName}. El horario quedará disponible nuevamente.`
    : "";

  return (
    <ConfirmDialog
      open={appointment !== null}
      title="Cancelar cita"
      description={description}
      confirmLabel="Cancelar cita"
      cancelLabel="Volver"
      confirmColor="error"
      loading={cancelMutation.isPending}
      error={cancelMutation.isError ? getApiErrorMessage(cancelMutation.error) : null}
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
}
