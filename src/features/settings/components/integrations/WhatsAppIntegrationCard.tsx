import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Alert, Box, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { IntegrationSteps } from "./IntegrationSteps";
import type { BusinessSettings } from "../../types/settings.types";

const NEXT_STEPS_NOT_CONFIGURED = [
  "Desplegar el backend en una URL pública.",
  "Configurar la aplicación en Meta Developers.",
  "Registrar el webhook.",
  "Configurar un número de prueba.",
  "Validar mensajes entrantes y salientes.",
  "Conectar el número real.",
];

interface WhatsAppIntegrationCardProps {
  settings: BusinessSettings;
}

export function WhatsAppIntegrationCard({ settings }: WhatsAppIntegrationCardProps) {
  const configured = settings.whatsappConfigured;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1 }}>
        <WhatsAppIcon color={configured ? "success" : "disabled"} />
        <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
          WhatsApp Cloud API
        </Typography>
        <Chip
          label={configured ? "Configurado" : "No configurado"}
          color={configured ? "success" : "warning"}
          variant="outlined"
          size="small"
        />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {configured
          ? "El negocio tiene identificadores de WhatsApp configurados en el servidor."
          : "La integración con WhatsApp todavía no está conectada a una cuenta real de Meta."}
      </Typography>

      {configured && (
        <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>
          Configuración básica detectada. La validación end-to-end (webhook verificado,
          mensajes entrantes y salientes) se realizará después del deploy.
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />
      <IntegrationSteps />

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Próximos pasos
      </Typography>
      {configured ? (
        <Typography variant="body2" color="text.secondary">
          La configuración básica está presente. La validación end-to-end se realizará
          después del deploy.
        </Typography>
      ) : (
        <List dense disablePadding>
          {NEXT_STEPS_NOT_CONFIGURED.map((step, index) => (
            <ListItem key={step} disableGutters>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <Typography variant="body2" color="text.secondary">
                  {index + 1}.
                </Typography>
              </ListItemIcon>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Webhook (información técnica)
      </Typography>
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          Endpoint de ejemplo:{" "}
          <Box
            component="code"
            sx={{ px: 0.5, py: 0.25, borderRadius: 1, bgcolor: "action.hover" }}
          >
            {"{BACKEND_URL}"}/api/webhooks/whatsapp
          </Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          GET — verificación del webhook.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          POST — recepción de eventos.
        </Typography>
      </Stack>
    </Paper>
  );
}
