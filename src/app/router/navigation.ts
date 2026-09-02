import type { SvgIconComponent } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ROUTES } from "../../routes/paths";

export interface NavigationItemConfig {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  breadcrumb: string;
}

export const navigationItems: NavigationItemConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: ROUTES.HOME,
    icon: DashboardOutlinedIcon,
    breadcrumb: "Dashboard",
  },
  {
    id: "appointments",
    label: "Agenda",
    path: ROUTES.APPOINTMENTS,
    icon: EventOutlinedIcon,
    breadcrumb: "Agenda",
  },
  {
    id: "services",
    label: "Servicios",
    path: ROUTES.SERVICES,
    icon: DesignServicesOutlinedIcon,
    breadcrumb: "Servicios",
  },
  {
    id: "employees",
    label: "Empleados",
    path: ROUTES.EMPLOYEES,
    icon: BadgeOutlinedIcon,
    breadcrumb: "Empleados",
  },
  {
    id: "customers",
    label: "Clientes",
    path: ROUTES.CUSTOMERS,
    icon: PeopleAltOutlinedIcon,
    breadcrumb: "Clientes",
  },
  {
    id: "conversations",
    label: "Conversaciones",
    path: ROUTES.CONVERSATIONS,
    icon: ChatOutlinedIcon,
    breadcrumb: "Conversaciones",
  },
  {
    id: "schedules",
    label: "Horarios",
    path: ROUTES.SCHEDULES,
    icon: ScheduleOutlinedIcon,
    breadcrumb: "Horarios",
  },
  {
    id: "settings",
    label: "Configuración",
    path: ROUTES.SETTINGS,
    icon: SettingsOutlinedIcon,
    breadcrumb: "Configuración",
  },
];
