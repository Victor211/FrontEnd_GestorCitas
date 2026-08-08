import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { useAppointments } from "../hooks/useAppointments";
import type { Appointment, AppointmentFilters } from "../types/appointment.types";
import { localDateTimeToInstant } from "../utils/dateConversion";
import { AppointmentCard } from "./AppointmentCard";
import { AppointmentsFilters, type AppointmentFiltersValue } from "./AppointmentsFilters";
import { AppointmentsSkeleton } from "./AppointmentsSkeleton";
import { AppointmentsTable } from "./AppointmentsTable";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

type AppliedFilters = Omit<AppointmentFilters, "page" | "size">;

interface AppointmentsListViewProps {
  onViewDetail: (appointment: Appointment) => void;
  onReschedule: (appointment: Appointment) => void;
  onChangeStatus: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onCreateClick: () => void;
}

export function AppointmentsListView({
  onViewDetail,
  onReschedule,
  onChangeStatus,
  onCancel,
  onCreateClick,
}: AppointmentsListViewProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [filtersKey, setFiltersKey] = useState(0);

  const filters: AppointmentFilters = useMemo(
    () => ({ page, size: pageSize, ...appliedFilters }),
    [page, pageSize, appliedFilters],
  );

  const appointmentsQuery = useAppointments(filters);
  const pageData = appointmentsQuery.data;
  const isEmpty = appointmentsQuery.isSuccess && pageData?.content.length === 0;
  const isFiltersActive = Object.keys(appliedFilters).length > 0;

  const handleApplyFilters = (draft: AppointmentFiltersValue) => {
    setAppliedFilters({
      employeeId: draft.employeeId || undefined,
      customerId: draft.customerId || undefined,
      status: draft.status || undefined,
      from: draft.from ? localDateTimeToInstant(draft.from) : undefined,
      to: draft.to ? localDateTimeToInstant(draft.to) : undefined,
    });
    setPage(0);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setPage(0);
    setFiltersKey((key) => key + 1);
  };

  return (
    <>
      <AppointmentsFilters
        key={filtersKey}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {appointmentsQuery.isPending && <AppointmentsSkeleton />}

      {appointmentsQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar las citas"
          error={appointmentsQuery.error}
          onRetry={() => void appointmentsQuery.refetch()}
          isRetrying={appointmentsQuery.isFetching}
        />
      )}

      {appointmentsQuery.isSuccess &&
        pageData &&
        (isEmpty ? (
          <EmptyState
            icon={
              isFiltersActive ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <EventBusyOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={isFiltersActive ? "No se encontraron citas" : "No hay citas registradas"}
            description={
              isFiltersActive
                ? "Probá con otros filtros."
                : "Todavía no cargaste citas para tu negocio."
            }
            actionLabel={isFiltersActive ? "Limpiar filtros" : "Crear primera cita"}
            onAction={isFiltersActive ? handleClearFilters : onCreateClick}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              opacity: appointmentsQuery.isFetching ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {appointmentsQuery.isFetching && <LinearProgress />}
            <AppointmentsTable
              appointments={pageData.content}
              onViewDetail={onViewDetail}
              onReschedule={onReschedule}
              onChangeStatus={onChangeStatus}
              onCancel={onCancel}
            />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 2, m: 0 }}
            >
              {pageData.content.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onViewDetail={onViewDetail}
                  onReschedule={onReschedule}
                  onChangeStatus={onChangeStatus}
                  onCancel={onCancel}
                />
              ))}
            </Stack>
            <TablePagination
              component="div"
              count={pageData.totalElements}
              page={pageData.number}
              rowsPerPage={pageData.size}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              onPageChange={(_event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(0);
              }}
              labelRowsPerPage="Filas por página"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
              }
            />
          </Paper>
        ))}
    </>
  );
}
