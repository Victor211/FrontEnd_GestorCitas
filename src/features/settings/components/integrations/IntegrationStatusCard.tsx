import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Chip, Paper, Stack, Typography, type ChipProps } from "@mui/material";
import type { ReactNode } from "react";
import type { BusinessSettings } from "../../types/settings.types";

interface StatusItemProps {
  icon: ReactNode;
  label: string;
  value: string;
  color: NonNullable<ChipProps["color"]>;
}

function StatusItem({ icon, label, value, color }: StatusItemProps) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        alignItems: "center",
        p: 1.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {label}
        </Typography>
        <Chip label={value} color={color} size="small" variant="outlined" sx={{ mt: 0.5 }} />
      </Box>
    </Stack>
  );
}

interface IntegrationStatusCardProps {
  settings: BusinessSettings;
}

export function IntegrationStatusCard({ settings }: IntegrationStatusCardProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Estado de integraciones
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Resumen general de lo que está activo y lo que depende del servidor.
      </Typography>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" } }}>
        <StatusItem
          icon={<WhatsAppIcon fontSize="small" />}
          label="WhatsApp"
          value={settings.whatsappConfigured ? "Configurado" : "No configurado"}
          color={settings.whatsappConfigured ? "success" : "default"}
        />
        <StatusItem
          icon={<SmartToyOutlinedIcon fontSize="small" />}
          label="Asistente IA"
          value="Administrado por servidor"
          color="info"
        />
        <StatusItem
          icon={<CloudDoneOutlinedIcon fontSize="small" />}
          label="Backend"
          value="Operativo"
          color="success"
        />
      </Box>
    </Paper>
  );
}
