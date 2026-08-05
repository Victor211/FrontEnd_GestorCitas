import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/paths";

const QUICK_ACTIONS = [
  {
    id: "appointment",
    label: "Nueva cita",
    icon: EventOutlinedIcon,
    to: ROUTES.APPOINTMENTS,
  },
  {
    id: "customer",
    label: "Nuevo cliente",
    icon: PeopleAltOutlinedIcon,
    to: ROUTES.CUSTOMERS,
  },
  {
    id: "service",
    label: "Nuevo servicio",
    icon: DesignServicesOutlinedIcon,
    to: ROUTES.SERVICES,
  },
  {
    id: "employee",
    label: "Nuevo empleado",
    icon: BadgeOutlinedIcon,
    to: ROUTES.EMPLOYEES,
  },
] as const;

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card component="section" variant="outlined" aria-label="Acciones rápidas" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Acciones rápidas
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{ flexWrap: "wrap" }}
        >
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.id}
              variant="outlined"
              startIcon={<action.icon />}
              onClick={() => navigate(action.to)}
              sx={{ justifyContent: "flex-start" }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
