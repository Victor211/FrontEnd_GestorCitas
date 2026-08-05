import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { Skeleton, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { useEmployees } from "../../employees/hooks/useEmployees";
import type { Employee } from "../../employees/types/employee.types";
import { ROUTES } from "../../../routes/paths";
import { DeleteScheduleDialog } from "../components/DeleteScheduleDialog";
import { EmployeeScheduleSelector } from "../components/EmployeeScheduleSelector";
import { ScheduleDialog } from "../components/ScheduleDialog";
import { SchedulesSkeleton } from "../components/SchedulesSkeleton";
import { WeeklySchedule } from "../components/WeeklySchedule";
import { useSchedulesByEmployee } from "../hooks/useSchedulesByEmployee";
import type { DayOfWeek, Schedule } from "../types/schedule.types";

const EMPLOYEES_SELECTOR_PARAMS = { page: 0, size: 100 };

interface ScheduleDialogState {
  open: boolean;
  schedule: Schedule | null;
  dayOfWeek: DayOfWeek | null;
  key: number;
}

const INITIAL_DIALOG_STATE: ScheduleDialogState = {
  open: false,
  schedule: null,
  dayOfWeek: null,
  key: 0,
};

export function SchedulesPage() {
  const navigate = useNavigate();
  const employeesQuery = useEmployees(EMPLOYEES_SELECTOR_PARAMS);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [autoSelected, setAutoSelected] = useState(false);
  const [dialogState, setDialogState] = useState<ScheduleDialogState>(INITIAL_DIALOG_STATE);
  const [deleteTarget, setDeleteTarget] = useState<Schedule | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const activeEmployees = useMemo(
    () => (employeesQuery.data?.content ?? []).filter((employee) => employee.active),
    [employeesQuery.data],
  );

  useEffect(() => {
    if (!autoSelected && employeesQuery.isSuccess && activeEmployees.length === 1) {
      setSelectedEmployee(activeEmployees[0] ?? null);
      setAutoSelected(true);
    }
  }, [employeesQuery.isSuccess, activeEmployees, autoSelected]);

  const schedulesQuery = useSchedulesByEmployee(selectedEmployee?.id ?? 0, {
    enabled: selectedEmployee !== null,
  });

  const handleAddBlock = (dayOfWeek: DayOfWeek) => {
    setDialogState((prev) => ({ open: true, schedule: null, dayOfWeek, key: prev.key + 1 }));
  };

  const handleEditBlock = (schedule: Schedule) => {
    setDialogState((prev) => ({
      open: true,
      schedule,
      dayOfWeek: schedule.dayOfWeek,
      key: prev.key + 1,
    }));
  };

  const handleDialogClose = () => setDialogState((prev) => ({ ...prev, open: false }));

  const handleDeleteClick = (schedule: Schedule) => setDeleteTarget(schedule);
  const handleDeleteClose = () => setDeleteTarget(null);

  return (
    <>
      <PageHeader
        title="Horarios"
        description="Definí los horarios de atención y disponibilidad de cada empleado."
      />

      {employeesQuery.isPending && (
        <Skeleton variant="rounded" height={56} sx={{ maxWidth: 420, mb: 3 }} />
      )}

      {employeesQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar los empleados"
          error={employeesQuery.error}
          onRetry={() => void employeesQuery.refetch()}
          isRetrying={employeesQuery.isFetching}
        />
      )}

      {employeesQuery.isSuccess && activeEmployees.length === 0 && (
        <EmptyState
          icon={<BadgeOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />}
          title="No hay empleados disponibles"
          description="Creá un empleado activo para poder definir sus horarios."
          actionLabel="Ir a empleados"
          onAction={() => navigate(ROUTES.EMPLOYEES)}
        />
      )}

      {employeesQuery.isSuccess && activeEmployees.length > 0 && (
        <Stack spacing={3}>
          <EmployeeScheduleSelector
            employees={activeEmployees}
            value={selectedEmployee}
            onChange={setSelectedEmployee}
          />

          {!selectedEmployee && (
            <EmptyState
              icon={<ScheduleOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />}
              title="Seleccioná un empleado para gestionar sus horarios"
            />
          )}

          {selectedEmployee && schedulesQuery.isPending && <SchedulesSkeleton />}

          {selectedEmployee && schedulesQuery.isError && (
            <ErrorAlert
              title="No se pudieron cargar los horarios"
              error={schedulesQuery.error}
              onRetry={() => void schedulesQuery.refetch()}
              isRetrying={schedulesQuery.isFetching}
            />
          )}

          {selectedEmployee && schedulesQuery.isSuccess && (
            <WeeklySchedule
              schedules={schedulesQuery.data}
              onAddBlock={handleAddBlock}
              onEditBlock={handleEditBlock}
              onDeleteBlock={handleDeleteClick}
            />
          )}
        </Stack>
      )}

      {selectedEmployee && (
        <ScheduleDialog
          open={dialogState.open}
          dialogKey={dialogState.key}
          schedule={dialogState.schedule}
          employeeId={selectedEmployee.id}
          dayOfWeek={dialogState.dayOfWeek}
          onClose={handleDialogClose}
          onSuccess={setSnackbarMessage}
        />
      )}
      <DeleteScheduleDialog
        schedule={deleteTarget}
        onClose={handleDeleteClose}
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
