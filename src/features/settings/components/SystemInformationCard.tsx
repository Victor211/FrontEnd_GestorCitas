import { Chip, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { BusinessSettings } from "../types/settings.types";

interface SystemInformationCardProps {
  settings: BusinessSettings;
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      {value}
    </Stack>
  );
}

export function SystemInformationCard({ settings }: SystemInformationCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Información
      </Typography>
      <Stack spacing={1.25} sx={{ mt: 2 }}>
        <InfoRow label="ID del negocio" value={<Typography variant="body2">{settings.id}</Typography>} />
        <InfoRow label="Nombre" value={<Typography variant="body2">{settings.name}</Typography>} />
        <InfoRow
          label="Zona horaria"
          value={<Typography variant="body2">{settings.timezone}</Typography>}
        />
        <InfoRow
          label="WhatsApp"
          value={
            <Chip
              label={settings.whatsappConfigured ? "Configurado" : "No configurado"}
              color={settings.whatsappConfigured ? "success" : "default"}
              variant="outlined"
              size="small"
            />
          }
        />
      </Stack>
    </Paper>
  );
}
