import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { UpcomingAppointment } from "../types/dashboard.types";
import { getAppointmentStatusConfig } from "../utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../utils/formatDashboardDate";

interface UpcomingAppointmentsTableProps {
  appointments: UpcomingAppointment[];
}

export function UpcomingAppointmentsTable({
  appointments,
}: UpcomingAppointmentsTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table size="small" aria-label="Próximas citas">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Empleado</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => {
            const statusConfig = getAppointmentStatusConfig(appointment.status);
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
