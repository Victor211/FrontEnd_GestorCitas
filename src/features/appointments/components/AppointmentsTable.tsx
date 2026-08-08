import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../../dashboard/utils/formatDashboardDate";
import type { Appointment } from "../types/appointment.types";
import { getAppointmentStatusRules } from "../utils/statusRules";

interface AppointmentsTableProps {
  appointments: Appointment[];
  onViewDetail: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onChangeStatus: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export function AppointmentsTable({
  appointments,
  onViewDetail,
  onReschedule,
  onChangeStatus,
  onCancel,
}: AppointmentsTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table aria-label="Citas">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            const statusConfig = getAppointmentStatusConfig(appointment.status);
            const rules = getAppointmentStatusRules(appointment.status);
            return (
              <TableRow key={appointment.id} hover>
                <TableCell>{formatAppointmentDate(appointment.startAt)}</TableCell>
                <TableCell>
                  {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
                </TableCell>
                <TableCell>{appointment.customerName}</TableCell>
                <TableCell>{appointment.serviceName}</TableCell>
                <TableCell>{appointment.employeeName}</TableCell>
                <TableCell>
                  <Chip
                    label={statusConfig.label}
                    color={statusConfig.color}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver detalle">
                    <IconButton
                      aria-label={`Ver detalle de la cita de ${appointment.customerName}`}
                      onClick={() => onViewDetail(appointment)}
                      size="small"
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Reprogramar">
                    <span>
                      <IconButton
                        aria-label={`Reprogramar cita de ${appointment.customerName}`}
                        onClick={() => onReschedule(appointment)}
                        disabled={!rules.canReschedule}
                        size="small"
                      >
                        <EventRepeatOutlinedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Cambiar estado">
                    <span>
                      <IconButton
                        aria-label={`Cambiar estado de la cita de ${appointment.customerName}`}
                        onClick={() => onChangeStatus(appointment)}
                        disabled={!rules.canChangeStatus}
                        size="small"
                      >
                        <SwapHorizOutlinedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Cancelar">
                    <span>
                      <IconButton
                        aria-label={`Cancelar cita de ${appointment.customerName}`}
                        onClick={() => onCancel(appointment)}
                        disabled={!rules.canCancel}
                        size="small"
                      >
                        <CancelOutlinedIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
