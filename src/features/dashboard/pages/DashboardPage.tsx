import { Stack } from "@mui/material";
import { useAuth } from "../../auth/hooks/useAuth";
import { DashboardError } from "../components/DashboardError";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { MetricsGrid } from "../components/MetricsGrid";
import { QuickActions } from "../components/QuickActions";
import { UpcomingAppointments } from "../components/UpcomingAppointments";
import { useDashboard } from "../hooks/useDashboard";

export function DashboardPage() {
  const { user } = useAuth();
  const dashboardQuery = useDashboard();

  if (!user) {
    return null;
  }

  return (
    <>
      <DashboardHeader
        firstName={user.firstName}
        businessName={user.businessName}
        onRefresh={() => void dashboardQuery.refetch()}
        isRefreshing={dashboardQuery.isFetching}
      />
      {dashboardQuery.isPending && <DashboardSkeleton />}
      {dashboardQuery.isError && (
        <DashboardError
          error={dashboardQuery.error}
          onRetry={() => void dashboardQuery.refetch()}
          isRetrying={dashboardQuery.isFetching}
        />
      )}
      {dashboardQuery.isSuccess && (
        <Stack spacing={3}>
          <MetricsGrid data={dashboardQuery.data} />
          <UpcomingAppointments appointments={dashboardQuery.data.upcomingAppointments} />
          <QuickActions />
        </Stack>
      )}
    </>
  );
}
