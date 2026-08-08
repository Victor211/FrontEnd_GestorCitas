import type { EventContentArg } from "@fullcalendar/core";
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import { formatAppointmentTimeRange } from "../../dashboard/utils/formatDashboardDate";
import type { AppointmentCalendarEventProps } from "../types/calendarEvent.types";
import { getAppointmentAriaLabel } from "../utils/appointmentCalendarMapper";

interface CalendarEventContentProps {
  arg: EventContentArg;
}

export function CalendarEventContent({ arg }: CalendarEventContentProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { appointment } = arg.event.extendedProps as AppointmentCalendarEventProps;
  const statusConfig = getAppointmentStatusConfig(appointment.status);

  const content = (
    <Box
      className="appointment-event-content"
      aria-label={getAppointmentAriaLabel(appointment)}
      sx={{ px: 0.5, py: 0.25, overflow: "hidden", lineHeight: 1.25 }}
    >
      <Typography
        variant="caption"
        component="div"
        sx={{ fontWeight: 700, fontSize: "0.7rem", whiteSpace: "nowrap" }}
      >
        {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
      </Typography>
      <Typography variant="caption" component="div" noWrap sx={{ fontWeight: 600 }}>
        {appointment.customerName}
      </Typography>
      <Typography variant="caption" component="div" noWrap sx={{ opacity: 0.85 }}>
        {appointment.serviceName}
      </Typography>
    </Box>
  );

  if (!isDesktop) {
    return content;
  }

  return (
    <Tooltip
      disableTouchListener
      disableFocusListener
      title={
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {appointment.customerName}
          </Typography>
          <Typography variant="caption" component="div">
            {appointment.serviceName}
          </Typography>
          <Typography variant="caption" component="div">
            {appointment.employeeName}
          </Typography>
          <Typography variant="caption" component="div">
            {formatAppointmentTimeRange(appointment.startAt, appointment.endAt)}
          </Typography>
          <Typography variant="caption" component="div">
            Estado: {statusConfig.label}
          </Typography>
        </Box>
      }
    >
      {content}
    </Tooltip>
  );
}
