import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import { useRescheduleAppointment } from "../hooks/useRescheduleAppointment";
import { rescheduleSchema, type RescheduleFormValues } from "../schemas/appointment.schema";
import type { Appointment } from "../types/appointment.types";
import { instantToLocalDateTimeInput, localDateTimeToInstant } from "../utils/dateConversion";

const FORM_ID = "reschedule-form";

interface RescheduleAppointmentDialogProps {
  appointment: Appointment | null;
  dialogKey: number;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function RescheduleAppointmentDialog({
  appointment,
  dialogKey,
  onClose,
  onSuccess,
}: RescheduleAppointmentDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const rescheduleMutation = useRescheduleAppointment();

  const handleClose = () => {
    if (rescheduleMutation.isPending) {
      return;
    }
    rescheduleMutation.reset();
    onClose();
  };

  const handleFormSubmit = (values: RescheduleFormValues) => {
    if (!appointment) {
      return;
    }

    rescheduleMutation.mutate(
      { id: appointment.id, request: { startAt: localDateTimeToInstant(values.newStartAt) } },
      {
        onSuccess: () => {
          onSuccess("Cita reprogramada correctamente.");
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={appointment !== null}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      aria-labelledby="reschedule-dialog-title"
    >
      <DialogTitle
        id="reschedule-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Reprogramar cita
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={rescheduleMutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {appointment && (
          <RescheduleForm
            key={dialogKey}
            formId={FORM_ID}
            appointment={appointment}
            onSubmit={handleFormSubmit}
            disabled={rescheduleMutation.isPending}
            error={rescheduleMutation.isError ? getApiErrorMessage(rescheduleMutation.error) : null}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={rescheduleMutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={rescheduleMutation.isPending}
          startIcon={
            rescheduleMutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined
          }
        >
          {rescheduleMutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface RescheduleFormProps {
  formId: string;
  appointment: Appointment;
  onSubmit: (values: RescheduleFormValues) => void;
  disabled: boolean;
  error: string | null;
}

function RescheduleForm({ formId, appointment, onSubmit, disabled, error }: RescheduleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RescheduleFormValues>({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: { newStartAt: instantToLocalDateTimeInput(appointment.startAt) },
  });

  return (
    <Stack component="form" id={formId} noValidate spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <FormErrorAlert message={error} />
      <Stack
        spacing={0.5}
        sx={{ p: 1.5, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
      >
        <Typography variant="body2" color="text.secondary">
          Horario actual
        </Typography>
        <Typography variant="body2">
          {formatAppointmentDate(appointment.startAt)} ·{" "}
          {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {appointment.serviceName} con {appointment.employeeName}
        </Typography>
      </Stack>
      <TextField
        {...register("newStartAt")}
        type="datetime-local"
        label="Nueva fecha y hora"
        error={!!errors.newStartAt}
        helperText={errors.newStartAt?.message}
        disabled={disabled}
        fullWidth
        required
        autoFocus
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Stack>
  );
}
