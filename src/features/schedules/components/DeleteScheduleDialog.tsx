import { ConfirmDialog } from "../../../components/feedback/ConfirmDialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useDeleteSchedule } from "../hooks/useDeleteSchedule";
import type { Schedule } from "../types/schedule.types";
import { getDayConfig } from "../utils/daysOfWeek";
import { formatScheduleTime } from "../utils/scheduleTime";

interface DeleteScheduleDialogProps {
  schedule: Schedule | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function DeleteScheduleDialog({
  schedule,
  onClose,
  onSuccess,
}: DeleteScheduleDialogProps) {
  const deleteMutation = useDeleteSchedule();

  const handleClose = () => {
    if (deleteMutation.isPending) {
      return;
    }
    deleteMutation.reset();
    onClose();
  };

  const handleConfirm = () => {
    if (!schedule) {
      return;
    }

    deleteMutation.mutate(
      { id: schedule.id, employeeId: schedule.employeeId },
      {
        onSuccess: () => {
          onSuccess("Horario eliminado correctamente.");
          onClose();
        },
      },
    );
  };

  const description = schedule
    ? `¿Deseás eliminar el horario del ${getDayConfig(schedule.dayOfWeek).fullLabel.toLowerCase()} de ${formatScheduleTime(schedule.startTime)} a ${formatScheduleTime(schedule.endTime)}? Dejará de considerarse como horario laboral. No elimina las citas existentes, pero puede afectar nuevas reservas.`
    : "";

  return (
    <ConfirmDialog
      open={schedule !== null}
      title="Eliminar horario"
      description={description}
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
