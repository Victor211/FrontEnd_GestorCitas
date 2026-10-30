import { Box } from "@mui/material";

const LOGO_SOURCES = {
  horizontal: "/branding/avnex-logo-horizontal-sin-eslogan.png",
  vertical: "/branding/avnex-logo-vertical-sin-eslogan.png",
  isotipo: "/branding/avnex-isotipo.png",
} as const;

interface AvnexLogoProps {
  variant: keyof typeof LOGO_SOURCES;
  /** Alto del logo en px; el ancho se calcula respetando la proporción. */
  height: number;
}

// Los logos son PNG transparentes con el texto "AVNEX" en blanco: en tema claro
// se apoyan sobre un recuadro oscuro para que el texto siga legible.
export function AvnexLogo({ variant, height }: AvnexLogoProps) {
  return (
    <Box
      sx={(theme) => ({
        display: "inline-flex",
        maxWidth: "100%",
        borderRadius: 2,
        ...(theme.palette.mode === "light" && {
          bgcolor: "#060910",
          px: 1,
        }),
      })}
    >
      <Box
        component="img"
        src={LOGO_SOURCES[variant]}
        alt="AVNEX"
        draggable={false}
        sx={{
          display: "block",
          height,
          width: "auto",
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
