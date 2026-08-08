import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import { Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";

const ASSISTANT_CAPABILITIES = [
  "Responder saludos.",
  "Informar los servicios del negocio.",
  "Consultar disponibilidad.",
  "Reservar citas.",
];

export function AiIntegrationCard() {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1 }}>
        <SmartToyOutlinedIcon color="action" />
        <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
          Asistente con IA
        </Typography>
        <Chip label="Administrado por servidor" color="info" variant="outlined" size="small" />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        La configuración de OpenAI se administra de forma segura desde el backend.
      </Typography>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Qué puede hacer hoy
      </Typography>
      <List dense disablePadding>
        {ASSISTANT_CAPABILITIES.map((capability) => (
          <ListItem key={capability} disableGutters>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlinedIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary={capability} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Prueba del asistente
      </Typography>
      <Typography variant="body2" color="text.secondary">
        El asistente se validará end-to-end mediante WhatsApp después del despliegue.
      </Typography>
    </Paper>
  );
}
