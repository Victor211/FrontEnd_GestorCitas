import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { UpcomingAppointment } from "../types/dashboard.types";
import { getAppointmentStatusConfig } from "../utils/appointmentStatus";
import {
  formatAppointmentDate,
  formatAppointmentTimeRange,
} from "../utils/formatDashboardDate";

interface UpcomingAppointmentCardProps {
  appointment: UpcomingAppointment;
}

export function UpcomingAppointmentCard({
  appointment,
}: UpcomingAppointmentCardProps) {
  const statusConfig = getAppointmentStatusConfig(appointment.status);

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
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
      </CardContent>
    </Card>
  );
}
