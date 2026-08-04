import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { navigationItems } from "../../app/router/navigation";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED, HEADER_HEIGHT } from "../constants";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
  collapsed: boolean;
  onMenuClick: () => void;
}

export function Header({ collapsed, onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const location = useLocation();
  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname,
  );
  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        borderBottom: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        color: "text.primary",
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar sx={{ height: HEADER_HEIGHT, minHeight: `${HEADER_HEIGHT}px !important` }}>
        <IconButton
          aria-label="Abrir menú de navegación"
          onClick={onMenuClick}
          sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
          {currentPage?.label ?? ""}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {user && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mr: 2, display: { xs: "none", sm: "block" } }}
            noWrap
          >
            {user.businessName}
          </Typography>
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
