import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Divider, Drawer, IconButton, Toolbar } from "@mui/material";
import { AvnexLogo } from "../../components/branding/AvnexLogo";
import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED } from "../constants";
import { NavigationList } from "./NavigationList";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function Sidebar({ collapsed, onToggleCollapsed }: SidebarProps) {
  const width = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        [`& .MuiDrawer-paper`]: {
          width,
          overflowX: "hidden",
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: 1,
        }}
      >
        {!collapsed && (
          <Box sx={{ pl: 1, minWidth: 0 }}>
            <AvnexLogo variant="horizontal" height={44} />
          </Box>
        )}
        <IconButton
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
      <Divider sx={{ mb: 1 }} />
      <NavigationList collapsed={collapsed} />
      {collapsed && (
        <Box sx={{ mt: "auto", display: "flex", justifyContent: "center", py: 2 }}>
          <AvnexLogo variant="isotipo" height={36} />
        </Box>
      )}
    </Drawer>
  );
}
