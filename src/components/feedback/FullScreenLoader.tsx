import { Box, CircularProgress } from "@mui/material";

export function FullScreenLoader() {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label="Cargando"
      sx={{
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
