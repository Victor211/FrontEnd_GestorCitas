import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import type { NavigationItemConfig } from "../../app/router/navigation";

interface NavigationItemProps {
  item: NavigationItemConfig;
  collapsed: boolean;
  onNavigate?: () => void;
}

export function NavigationItem({
  item,
  collapsed,
  onNavigate,
}: NavigationItemProps) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const Icon = item.icon;

  const button = (
    <ListItemButton
      component={RouterLink}
      to={item.path}
      selected={isActive}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      sx={{
        minHeight: 48,
        justifyContent: collapsed ? "center" : "flex-start",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: collapsed ? 0 : 2,
          justifyContent: "center",
          color: isActive ? "primary.main" : "inherit",
        }}
      >
        <Icon />
      </ListItemIcon>
      {!collapsed && (
        <ListItemText
          primary={item.label}
          slotProps={{
            primary: {
              sx: { fontWeight: isActive ? 600 : 400 },
            },
          }}
        />
      )}
    </ListItemButton>
  );

  return (
    <ListItem disablePadding>
      {collapsed ? (
        <Tooltip title={item.label} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
    </ListItem>
  );
}
