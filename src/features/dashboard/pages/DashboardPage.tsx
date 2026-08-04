import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAuth } from "../../auth/hooks/useAuth";

const STAT_CARDS = [
  { id: "today", label: "Citas de hoy" },
  { id: "upcoming", label: "Próximas citas" },
  { id: "customers", label: "Clientes" },
  { id: "employees", label: "Empleados" },
];

export function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Hola, {user.firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {user.businessName} — sesión autenticada correctamente.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {STAT_CARDS.map((card) => (
          <Card key={card.id} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                —
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Próximamente
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}
