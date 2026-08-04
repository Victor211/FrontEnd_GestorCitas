import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Breadcrumbs as MuiBreadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { navigationItems } from "../../app/router/navigation";
import { ROUTES } from "../../routes/paths";

export function Breadcrumbs() {
  const location = useLocation();
  const currentPage = navigationItems.find(
    (item) => item.path === location.pathname,
  );
  const isHome = location.pathname === ROUTES.HOME;

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" sx={{ px: { xs: 2, md: 3 }, py: 1.5 }}>
      <MuiLink
        component={RouterLink}
        to={ROUTES.HOME}
        underline="hover"
        color={isHome ? "text.primary" : "inherit"}
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        <HomeOutlinedIcon fontSize="small" />
        <Typography component="span" variant="body2" sx={{ display: { xs: "none", sm: "inline" } }}>
          Inicio
        </Typography>
      </MuiLink>
      {!isHome && currentPage && (
        <Typography variant="body2" color="text.primary">
          {currentPage.breadcrumb}
        </Typography>
      )}
    </MuiBreadcrumbs>
  );
}
