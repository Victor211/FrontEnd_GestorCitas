import { Paper, Typography } from "@mui/material";
import { BusinessSettingsForm } from "./BusinessSettingsForm";
import type { BusinessSettings } from "../types/settings.types";

interface BusinessInformationCardProps {
  settings: BusinessSettings;
  onSuccess: (message: string) => void;
}

export function BusinessInformationCard({ settings, onSuccess }: BusinessInformationCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Información del negocio
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Administrá los datos generales utilizados por el sistema.
      </Typography>
      <BusinessSettingsForm settings={settings} onSuccess={onSuccess} />
    </Paper>
  );
}
