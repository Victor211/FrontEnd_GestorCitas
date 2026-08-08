import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import type { BusinessSettings } from "../types/settings.types";

interface IntegrationsCardProps {
  settings: BusinessSettings;
}

export function IntegrationsCard({ settings }: IntegrationsCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Integraciones
      </Typography>
      <Stack spacing={1.5} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: 600, flexGrow: 1 }}>
            WhatsApp Cloud API
          </Typography>
          <Chip
            label={settings.whatsappConfigured ? "Configurado" : "No configurado"}
            color={settings.whatsappConfigured ? "success" : "default"}
            variant="outlined"
            size="small"
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {settings.whatsappConfigured
            ? "El negocio tiene una configuración de WhatsApp asociada."
            : "La integración con WhatsApp aún no está configurada."}
        </Typography>

        <Divider />

        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          OpenAI
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Integración administrada por el servidor.
        </Typography>

        <Divider />

        <Typography variant="caption" color="text.secondary">
          La configuración segura de credenciales se realizará durante la integración con
          Meta.
        </Typography>
      </Stack>
    </Paper>
  );
}
