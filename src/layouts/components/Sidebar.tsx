import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { Box, Divider, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
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
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", pl: 1, minWidth: 0 }}>
            <Box
              aria-hidden="true"
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EventAvailableOutlinedIcon sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
              Appointment Manager
            </Typography>
          </Stack>
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
    </Drawer>
  );
}
