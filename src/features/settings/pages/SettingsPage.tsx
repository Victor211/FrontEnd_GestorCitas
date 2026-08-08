import { Box, Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { BusinessInformationCard } from "../components/BusinessInformationCard";
import { IntegrationsOverview } from "../components/integrations/IntegrationsOverview";
import { SettingsSkeleton } from "../components/SettingsSkeleton";
import { SystemInformationCard } from "../components/SystemInformationCard";
import { useBusinessSettings } from "../hooks/useBusinessSettings";

type SettingsTab = "general" | "integrations";

export function SettingsPage() {
  const settingsQuery = useBusinessSettings();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  return (
    <>
      <PageHeader
        title="Configuración"
        description="Administrá los datos generales de tu negocio."
      />

      {settingsQuery.isPending && <SettingsSkeleton />}

      {settingsQuery.isError && (
        <ErrorAlert
          title="No se pudo cargar la configuración"
          error={settingsQuery.error}
          onRetry={() => void settingsQuery.refetch()}
          isRetrying={settingsQuery.isFetching}
        />
      )}

      {settingsQuery.isSuccess && settingsQuery.data && (
        <Box>
          <Tabs
            value={activeTab}
            onChange={(_event, value: SettingsTab) => setActiveTab(value)}
            sx={{ mb: 3, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Tab label="General" value="general" />
            <Tab label="Integraciones" value="integrations" />
          </Tabs>

          {activeTab === "general" && (
            <Stack spacing={3}>
              <BusinessInformationCard settings={settingsQuery.data} onSuccess={setSnackbarMessage} />
              <SystemInformationCard settings={settingsQuery.data} />
            </Stack>
          )}

          {activeTab === "integrations" && <IntegrationsOverview settings={settingsQuery.data} />}
        </Box>
      )}

      <SuccessSnackbar
        open={snackbarMessage !== null}
        message={snackbarMessage ?? ""}
        onClose={() => setSnackbarMessage(null)}
      />
    </>
  );
}
