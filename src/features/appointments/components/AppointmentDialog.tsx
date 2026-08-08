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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useCreateAppointment } from "../hooks/useCreateAppointment";
import {
  appointmentFormDefaultValues,
  normalizeAppointmentPayload,
} from "../schemas/appointment.schema";
import type { AppointmentFormValues } from "../types/appointment.types";
import { AppointmentForm } from "./AppointmentForm";

const FORM_ID = "appointment-form";

interface AppointmentDialogProps {
  open: boolean;
  dialogKey: number;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function AppointmentDialog({
  open,
  dialogKey,
  onClose,
  onSuccess,
}: AppointmentDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const createMutation = useCreateAppointment();

  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }
    createMutation.reset();
    onClose();
  };

  const handleSubmit = (values: AppointmentFormValues) => {
    const request = normalizeAppointmentPayload(values);

    createMutation.mutate(request, {
      onSuccess: () => {
        onSuccess("Cita creada correctamente.");
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      aria-labelledby="appointment-dialog-title"
    >
      <DialogTitle
        id="appointment-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Nueva cita
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={createMutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormErrorAlert
            message={createMutation.isError ? getApiErrorMessage(createMutation.error) : null}
          />
          <AppointmentForm
            key={dialogKey}
            formId={FORM_ID}
            defaultValues={appointmentFormDefaultValues}
            onSubmit={handleSubmit}
            disabled={createMutation.isPending}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={createMutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={createMutation.isPending}
          startIcon={createMutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {createMutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
