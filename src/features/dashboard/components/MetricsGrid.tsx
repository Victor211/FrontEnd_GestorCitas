import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box } from "@mui/material";
import { ROUTES } from "../../../routes/paths";
import type { DashboardResponse } from "../types/dashboard.types";
import { MetricCard } from "./MetricCard";

interface MetricsGridProps {
  data: DashboardResponse;
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const metrics = [
    {
      id: "today",
      icon: EventOutlinedIcon,
      title: "Citas de hoy",
      value: data.todayAppointments,
      actionLabel: "Ver agenda",
      to: ROUTES.APPOINTMENTS,
    },
    {
      id: "customers",
      icon: PeopleAltOutlinedIcon,
      title: "Clientes activos",
      value: data.activeCustomers,
      actionLabel: "Ver clientes",
      to: ROUTES.CUSTOMERS,
    },
    {
      id: "employees",
      icon: BadgeOutlinedIcon,
      title: "Empleados activos",
      value: data.activeEmployees,
      actionLabel: "Ver empleados",
      to: ROUTES.EMPLOYEES,
    },
    {
      id: "services",
      icon: DesignServicesOutlinedIcon,
      title: "Servicios activos",
      value: data.activeServices,
      actionLabel: "Ver servicios",
      to: ROUTES.SERVICES,
    },
  ];

  return (
    <Box
      component="section"
      aria-label="Métricas del negocio"
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </Box>
  );
}
