import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/common/EmptyState";
import { ROUTES } from "../../../routes/paths";
import type { UpcomingAppointment } from "../types/dashboard.types";
import { UpcomingAppointmentCard } from "./UpcomingAppointmentCard";
import { UpcomingAppointmentsTable } from "./UpcomingAppointmentsTable";

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const navigate = useNavigate();

  return (
    <Card
      component="section"
      variant="outlined"
      aria-label="Próximas citas"
      sx={{ borderRadius: 3 }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Próximas citas
        </Typography>
        {appointments.length === 0 ? (
          <EmptyState
            icon={<EventBusyOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />}
            title="No hay próximas citas"
            description="Todavía no tenés turnos agendados."
            actionLabel="Crear cita"
            onAction={() => navigate(ROUTES.APPOINTMENTS)}
          />
        ) : (
          <>
            <UpcomingAppointmentsTable appointments={appointments} />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 0, m: 0 }}
            >
              {appointments.map((appointment) => (
                <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
