import type { SvgIconComponent } from "@mui/icons-material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ROUTES } from "../../routes/paths";

export interface NavigationItemConfig {
  id: string;
  label: string;
  path: string;
  icon: SvgIconComponent;
  breadcrumb: string;
  /** Roles con acceso. Si se omite, cualquier usuario autenticado. */
  allowedRoles?: string[];
}

/** Único rol que administra usuarios (el backend lo valida con hasRole('OWNER')). */
export const USER_MANAGEMENT_ROLE = "OWNER";

export function canAccessNavigationItem(
  item: NavigationItemConfig,
  role: string | undefined,
): boolean {
  return !item.allowedRoles || (role !== undefined && item.allowedRoles.includes(role));
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
    id: "users",
    label: "Usuarios",
    path: ROUTES.USERS,
    icon: ManageAccountsOutlinedIcon,
    breadcrumb: "Usuarios",
    allowedRoles: [USER_MANAGEMENT_ROLE],
  },
  {
    id: "settings",
    label: "Configuración",
    path: ROUTES.SETTINGS,
    icon: SettingsOutlinedIcon,
    breadcrumb: "Configuración",
  },
];
