import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { AppointmentDetailDialog } from "../components/AppointmentDetailDialog";
import { AppointmentDialog } from "../components/AppointmentDialog";
import { AppointmentViewSwitcher } from "../components/AppointmentViewSwitcher";
import { AppointmentsCalendar } from "../components/AppointmentsCalendar";
import { AppointmentsListView } from "../components/AppointmentsListView";
import { CancelAppointmentDialog } from "../components/CancelAppointmentDialog";
import { RescheduleAppointmentDialog } from "../components/RescheduleAppointmentDialog";
import { UpdateStatusDialog } from "../components/UpdateStatusDialog";
import type { Appointment } from "../types/appointment.types";
import { appointmentViewPreference } from "../utils/appointmentViewPreference";

export function AppointmentsPage() {
  const [viewMode, setViewMode] = useState(() => appointmentViewPreference.getAppointmentViewMode());
  const [hasVisitedList, setHasVisitedList] = useState(viewMode === "list");

  const [createOpen, setCreateOpen] = useState(false);
  const [createKey, setCreateKey] = useState(0);
  const [createInitialStartAt, setCreateInitialStartAt] = useState<string | undefined>(undefined);
  const [detailTarget, setDetailTarget] = useState<Appointment | null>(null);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [rescheduleKey, setRescheduleKey] = useState(0);
  const [statusTarget, setStatusTarget] = useState<Appointment | null>(null);
  const [statusKey, setStatusKey] = useState(0);
  const [cancelTarget, setCancelTarget] = useState<Appointment | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleViewModeChange = (mode: typeof viewMode) => {
    setViewMode(mode);
    appointmentViewPreference.setAppointmentViewMode(mode);
    if (mode === "list") {
      setHasVisitedList(true);
    }
  };

  const handleCreateClick = (initialStartAt?: string) => {
    setCreateKey((key) => key + 1);
    setCreateInitialStartAt(initialStartAt);
    setCreateOpen(true);
  };
  const handleCreateClose = () => setCreateOpen(false);

  const handleViewDetail = (appointment: Appointment) => setDetailTarget(appointment);
  const handleDetailClose = () => setDetailTarget(null);

  const handleReschedule = (appointment: Appointment) => {
    setRescheduleKey((key) => key + 1);
    setRescheduleTarget(appointment);
  };
  const handleRescheduleClose = () => setRescheduleTarget(null);

  const handleChangeStatus = (appointment: Appointment) => {
    setStatusKey((key) => key + 1);
    setStatusTarget(appointment);
  };
  const handleStatusClose = () => setStatusTarget(null);

  const handleCancelClick = (appointment: Appointment) => setCancelTarget(appointment);
  const handleCancelClose = () => setCancelTarget(null);

  return (
    <>
      <PageHeader title="Agenda" description="Visualizá y gestioná los turnos de tu negocio." />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, mb: 2 }}
      >
        <AppointmentViewSwitcher value={viewMode} onChange={handleViewModeChange} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleCreateClick()}>
          Nueva cita
        </Button>
      </Stack>

      <Box sx={{ display: viewMode === "calendar" ? "block" : "none" }}>
        <AppointmentsCalendar
          onViewDetail={handleViewDetail}
          onCreateClick={handleCreateClick}
          onSuccess={setSnackbarMessage}
        />
      </Box>

      {hasVisitedList && (
        <Box sx={{ display: viewMode === "list" ? "block" : "none" }}>
          <AppointmentsListView
            onViewDetail={handleViewDetail}
            onReschedule={handleReschedule}
            onChangeStatus={handleChangeStatus}
            onCancel={handleCancelClick}
            onCreateClick={handleCreateClick}
          />
        </Box>
      )}

      <AppointmentDialog
        open={createOpen}
        dialogKey={createKey}
        initialStartAt={createInitialStartAt}
        onClose={handleCreateClose}
        onSuccess={setSnackbarMessage}
      />
      <AppointmentDetailDialog
        appointment={detailTarget}
        onClose={handleDetailClose}
        onReschedule={handleReschedule}
        onChangeStatus={handleChangeStatus}
        onCancel={handleCancelClick}
      />
      <RescheduleAppointmentDialog
        appointment={rescheduleTarget}
        dialogKey={rescheduleKey}
        onClose={handleRescheduleClose}
        onSuccess={setSnackbarMessage}
      />
      <UpdateStatusDialog
        appointment={statusTarget}
        dialogKey={statusKey}
        onClose={handleStatusClose}
        onSuccess={setSnackbarMessage}
      />
      <CancelAppointmentDialog
        appointment={cancelTarget}
        onClose={handleCancelClose}
        onSuccess={setSnackbarMessage}
      />
      <SuccessSnackbar
        open={snackbarMessage !== null}
        message={snackbarMessage ?? ""}
        onClose={() => setSnackbarMessage(null)}
      />
    </>
  );
}
