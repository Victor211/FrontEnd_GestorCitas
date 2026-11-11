import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  logo?: ReactNode;
  children: ReactNode;
}

// Formas geométricas decorativas del panel izquierdo (solo CSS, sin interacción).
const decorativeRing = {
  position: "absolute",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.12)",
  pointerEvents: "none",
} as const;

export function AuthLayout({ title, subtitle, logo, children }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          flex: { md: "1 1 46%" },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          px: { md: 6, lg: 10 },
          py: 8,
          color: "primary.contrastText",
          background: (theme) =>
            `linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 70%, ${theme.palette.primary.light} 140%)`,
        }}
      >
        <Box
          sx={{
            ...decorativeRing,
            width: 420,
            height: 420,
            top: -140,
            right: -120,
          }}
        />
        <Box
          sx={{
            ...decorativeRing,
            width: 260,
            height: 260,
            bottom: -80,
            left: -70,
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        />
        <Box sx={{ position: "relative", maxWidth: 440 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { md: "2.25rem", lg: "2.75rem" },
              lineHeight: 1.15,
              textWrap: "balance",
              mb: 2.5,
            }}
          >
            Tu negocio, mejor organizado.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { md: "1rem", lg: "1.125rem" },
              lineHeight: 1.6,
              opacity: 0.88,
              textWrap: "balance",
            }}
          >
            Gestioná turnos, clientes y automatizaciones desde una sola
            plataforma.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: { md: "1 1 54%" },
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 6 },
          py: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          {logo && (
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                mb: 2,
              }}
            >
              {logo}
            </Box>
          )}
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 700, mb: 0.5, textAlign: { xs: "center", md: "left" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, textAlign: { xs: "center", md: "left" } }}
          >
            {subtitle}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
