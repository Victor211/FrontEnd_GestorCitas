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
import { useCreateSchedule } from "../hooks/useCreateSchedule";
import { useUpdateSchedule } from "../hooks/useUpdateSchedule";
import {
  normalizeSchedulePayload,
  toScheduleFormValues,
} from "../schemas/schedule.schema";
import type { DayOfWeek, Schedule, ScheduleFormValues } from "../types/schedule.types";
import { ScheduleForm } from "./ScheduleForm";

const FORM_ID = "schedule-form";

interface ScheduleDialogProps {
  open: boolean;
  dialogKey: number;
  schedule: Schedule | null;
  employeeId: number;
  dayOfWeek: DayOfWeek | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function ScheduleDialog({
  open,
  dialogKey,
  schedule,
  employeeId,
  dayOfWeek,
  onClose,
  onSuccess,
}: ScheduleDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEditMode = schedule !== null;

  const createMutation = useCreateSchedule();
  const updateMutation = useUpdateSchedule();
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleClose = () => {
    if (mutation.isPending) {
      return;
    }
    createMutation.reset();
    updateMutation.reset();
    onClose();
  };

  const handleSubmit = (values: ScheduleFormValues) => {
    const request = normalizeSchedulePayload(values);

    if (schedule) {
      updateMutation.mutate(
        { id: schedule.id, request },
        {
          onSuccess: () => {
            onSuccess("Horario actualizado correctamente.");
            onClose();
          },
        },
      );
      return;
    }

    createMutation.mutate(request, {
      onSuccess: () => {
        onSuccess("Horario creado correctamente.");
        onClose();
      },
    });
  };

  const defaultValues: ScheduleFormValues = schedule
    ? toScheduleFormValues(schedule)
    : {
        employeeId,
        dayOfWeek: dayOfWeek ?? "MONDAY",
        startTime: "",
        endTime: "",
      };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      aria-labelledby="schedule-dialog-title"
    >
      <DialogTitle
        id="schedule-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {isEditMode ? "Editar horario" : "Nuevo horario"}
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={mutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormErrorAlert
            message={mutation.isError ? getApiErrorMessage(mutation.error) : null}
          />
          <ScheduleForm
            key={`${dialogKey}-${schedule ? schedule.id : "create"}`}
            formId={FORM_ID}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            disabled={mutation.isPending}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={mutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={mutation.isPending}
          startIcon={mutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
