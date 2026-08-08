import { Box, Stack } from "@mui/material";
import type { BusinessSettings } from "../../types/settings.types";
import { AiIntegrationCard } from "./AiIntegrationCard";
import { IntegrationStatusCard } from "./IntegrationStatusCard";
import { SecurityNotice } from "./SecurityNotice";
import { WhatsAppIntegrationCard } from "./WhatsAppIntegrationCard";

interface IntegrationsOverviewProps {
  settings: BusinessSettings;
}

export function IntegrationsOverview({ settings }: IntegrationsOverviewProps) {
  return (
    <Stack spacing={3}>
      <IntegrationStatusCard settings={settings} />
      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <WhatsAppIntegrationCard settings={settings} />
        <AiIntegrationCard />
      </Box>
      <SecurityNotice />
    </Stack>
  );
}
