import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useCustomer } from "../../customers/hooks/useCustomer";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import { formatServiceDuration, formatServicePrice } from "../../services/utils/formatters";
import type { Appointment } from "../types/appointment.types";
import { getAppointmentStatusRules } from "../utils/statusRules";

interface AppointmentDetailDialogProps {
  appointment: Appointment | null;
  onClose: () => void;
  onReschedule?: (appointment: Appointment) => void;
  onChangeStatus?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
}

export function AppointmentDetailDialog({
  appointment,
  onClose,
  onReschedule,
  onChangeStatus,
  onCancel,
}: AppointmentDetailDialogProps) {
  const customerQuery = useCustomer(appointment?.customerId ?? 0, {
    enabled: appointment !== null,
  });

  const statusConfig = appointment ? getAppointmentStatusConfig(appointment.status) : null;
  const rules = appointment ? getAppointmentStatusRules(appointment.status) : null;
  const hasQuickActions = Boolean(onReschedule ?? onChangeStatus ?? onCancel);

  return (
    <Dialog
      open={appointment !== null}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="appointment-detail-title"
    >
      <DialogTitle
        id="appointment-detail-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Detalle de la cita
        <IconButton aria-label="Cerrar" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {appointment && statusConfig && (
          <Stack spacing={1.5}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {appointment.customerName}
              </Typography>
              <Chip
                label={statusConfig.label}
                color={statusConfig.color}
                size="small"
                variant="outlined"
              />
            </Stack>
            {customerQuery.isPending ? (
              <Skeleton variant="text" width={140} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {customerQuery.data?.phone ?? "Teléfono no disponible"}
              </Typography>
            )}
            <Divider />
            <Stack spacing={0.5}>
              <Typography variant="body2">
                <strong>Servicio:</strong> {appointment.serviceName}
              </Typography>
              <Typography variant="body2">
                <strong>Empleado:</strong> {appointment.employeeName}
              </Typography>
              <Typography variant="body2">
                <strong>Duración:</strong> {formatServiceDuration(appointment.serviceDurationMinutes)}
              </Typography>
              <Typography variant="body2">
                <strong>Precio:</strong> {formatServicePrice(appointment.servicePrice)}
              </Typography>
              <Typography variant="body2">
                <strong>Fecha:</strong> {formatAppointmentDate(appointment.startAt)}
              </Typography>
              <Typography variant="body2">
                <strong>Hora:</strong>{" "}
                {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
              </Typography>
            </Stack>
            {appointment.notes && (
              <>
                <Divider />
                <Typography variant="body2" color="text.secondary">
                  {appointment.notes}
                </Typography>
              </>
            )}
            <Divider />
            <Typography variant="caption" color="text.secondary">
              Creada el {formatAppointmentDate(appointment.createdAt)}
            </Typography>
          </Stack>
        )}
      </DialogContent>
      {hasQuickActions && appointment && rules && (
        <DialogActions sx={{ px: 3, py: 2, flexWrap: "wrap", gap: 1 }}>
          {onReschedule && (
            <Button
              size="small"
              startIcon={<EventRepeatOutlinedIcon fontSize="small" />}
              disabled={!rules.canReschedule}
              onClick={() => {
                onReschedule(appointment);
                onClose();
              }}
            >
              Reprogramar
            </Button>
          )}
          {onChangeStatus && (
            <Button
              size="small"
              startIcon={<SwapHorizOutlinedIcon fontSize="small" />}
              disabled={!rules.canChangeStatus}
              onClick={() => {
                onChangeStatus(appointment);
                onClose();
              }}
            >
              Cambiar estado
            </Button>
          )}
          {onCancel && (
            <Button
              size="small"
              color="error"
              startIcon={<CancelOutlinedIcon fontSize="small" />}
              disabled={!rules.canCancel}
              onClick={() => {
                onCancel(appointment);
                onClose();
              }}
            >
              Cancelar
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
