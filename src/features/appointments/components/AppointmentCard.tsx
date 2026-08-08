import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import type { Appointment } from "../types/appointment.types";
import { getAppointmentStatusRules } from "../utils/statusRules";

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetail: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onChangeStatus: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export function AppointmentCard({
  appointment,
  onViewDetail,
  onReschedule,
  onChangeStatus,
  onCancel,
}: AppointmentCardProps) {
  const statusConfig = getAppointmentStatusConfig(appointment.status);
  const rules = getAppointmentStatusRules(appointment.status);

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {formatAppointmentDate(appointment.startAt)} ·{" "}
            {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
          </Typography>
          <Chip
            label={statusConfig.label}
            color={statusConfig.color}
            size="small"
            variant="outlined"
          />
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {appointment.customerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {appointment.serviceName} · {appointment.employeeName}
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <IconButton
            aria-label={`Ver detalle de la cita de ${appointment.customerName}`}
            onClick={() => onViewDetail(appointment)}
            size="small"
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Reprogramar cita de ${appointment.customerName}`}
            onClick={() => onReschedule(appointment)}
            disabled={!rules.canReschedule}
            size="small"
          >
            <EventRepeatOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Cambiar estado de la cita de ${appointment.customerName}`}
            onClick={() => onChangeStatus(appointment)}
            disabled={!rules.canChangeStatus}
            size="small"
          >
            <SwapHorizOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Cancelar cita de ${appointment.customerName}`}
            onClick={() => onCancel(appointment)}
            disabled={!rules.canCancel}
            size="small"
          >
            <CancelOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
