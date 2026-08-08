import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { BusinessInformationCard } from "../components/BusinessInformationCard";
import { IntegrationsCard } from "../components/IntegrationsCard";
import { SettingsSkeleton } from "../components/SettingsSkeleton";
import { SystemInformationCard } from "../components/SystemInformationCard";
import { useBusinessSettings } from "../hooks/useBusinessSettings";

export function SettingsPage() {
  const settingsQuery = useBusinessSettings();
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

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
        <Stack spacing={3}>
          <BusinessInformationCard settings={settingsQuery.data} onSuccess={setSnackbarMessage} />
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <IntegrationsCard settings={settingsQuery.data} />
            <SystemInformationCard settings={settingsQuery.data} />
          </Box>
        </Stack>
      )}

      <SuccessSnackbar
        open={snackbarMessage !== null}
        message={snackbarMessage ?? ""}
        onClose={() => setSnackbarMessage(null)}
      />
    </>
  );
}
