import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          px: 8,
          color: "primary.contrastText",
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          Appointment Manager
        </Typography>
        <Typography variant="body1">
          Gestioná turnos, empleados y clientes de tu negocio en un solo
          lugar.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 480 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            {subtitle}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
