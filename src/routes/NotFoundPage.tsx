import { Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "./paths";

export function NotFoundPage() {
  return (
    <Container sx={{ py: 10 }}>
      <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h6">Página no encontrada</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
          La página que buscás no existe o fue movida.
        </Typography>
        <Button component={RouterLink} to={ROUTES.HOME} variant="contained">
          Volver al inicio
        </Button>
      </Stack>
    </Container>
  );
}
