import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import { useUpdateAppointmentStatus } from "../hooks/useUpdateAppointmentStatus";
import type { Appointment, AppointmentStatus } from "../types/appointment.types";

const SELECTABLE_STATUSES: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "NO_SHOW",
];

const FORM_ID = "update-status-form";

interface UpdateStatusDialogProps {
  appointment: Appointment | null;
  dialogKey: number;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function UpdateStatusDialog({
  appointment,
  dialogKey,
  onClose,
  onSuccess,
}: UpdateStatusDialogProps) {
  const updateStatusMutation = useUpdateAppointmentStatus();

  const handleClose = () => {
    if (updateStatusMutation.isPending) {
      return;
    }
    updateStatusMutation.reset();
    onClose();
  };

  const handleSubmit = (status: AppointmentStatus) => {
    if (!appointment) {
      return;
    }

    updateStatusMutation.mutate(
      { id: appointment.id, request: { status } },
      {
        onSuccess: () => {
          onSuccess("Estado de la cita actualizado correctamente.");
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={appointment !== null}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      aria-labelledby="update-status-title"
    >
      <DialogTitle
        id="update-status-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Cambiar estado
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={updateStatusMutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormErrorAlert
            message={
              updateStatusMutation.isError ? getApiErrorMessage(updateStatusMutation.error) : null
            }
          />
          {appointment && (
            <StatusForm
              key={dialogKey}
              formId={FORM_ID}
              appointment={appointment}
              onSubmit={handleSubmit}
              disabled={updateStatusMutation.isPending}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={updateStatusMutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={updateStatusMutation.isPending}
          startIcon={
            updateStatusMutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined
          }
        >
          {updateStatusMutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface StatusFormProps {
  formId: string;
  appointment: Appointment;
  onSubmit: (status: AppointmentStatus) => void;
  disabled: boolean;
}

function StatusForm({ formId, appointment, onSubmit, disabled }: StatusFormProps) {
  const options = SELECTABLE_STATUSES.filter((status) => status !== appointment.status);
  const [status, setStatus] = useState<AppointmentStatus>(
    () => options[0] ?? appointment.status,
  );

  return (
    <Stack
      component="form"
      id={formId}
      noValidate
      spacing={2}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(status);
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {appointment.customerName} · {appointment.serviceName}
      </Typography>
      <TextField
        select
        label="Nuevo estado"
        value={status}
        onChange={(event) => setStatus(event.target.value as AppointmentStatus)}
        disabled={disabled}
        fullWidth
        required
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {getAppointmentStatusConfig(option).label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
