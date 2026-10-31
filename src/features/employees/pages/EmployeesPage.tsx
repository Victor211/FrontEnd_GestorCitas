import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { DEFAULT_STATUS_FILTER, toActiveParam, type StatusFilter } from "../../../utils/statusFilter";
import { PageHeader } from "../../../components/layout/PageHeader";
import { EmployeeStatusDialog, type EmployeeStatusTarget } from "../components/EmployeeStatusDialog";
import { EmployeeCard } from "../components/EmployeeCard";
import { EmployeeDialog } from "../components/EmployeeDialog";
import { EmployeesSkeleton } from "../components/EmployeesSkeleton";
import { EmployeesTable } from "../components/EmployeesTable";
import { EmployeesToolbar } from "../components/EmployeesToolbar";
import { useEmployees } from "../hooks/useEmployees";
import type { Employee, EmployeeFilters } from "../types/employee.types";

const SEARCH_DEBOUNCE_MS = 400;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

interface EmployeeDialogState {
  open: boolean;
  employee: Employee | null;
}

export function EmployeesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogState, setDialogState] = useState<EmployeeDialogState>({
    open: false,
    employee: null,
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(DEFAULT_STATUS_FILTER);
  const [statusTarget, setStatusTarget] = useState<EmployeeStatusTarget | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "info";
  } | null>(null);

  const notify = (message: string, severity: "success" | "info" = "success") =>
    setSnackbar({ message, severity });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const filters: EmployeeFilters = useMemo(
    () => ({
      page,
      size: pageSize,
      active: toActiveParam(statusFilter),
      ...(search ? { name: search } : {}),
    }),
    [page, pageSize, search, statusFilter],
  );

  const employeesQuery = useEmployees(filters);
  const pageData = employeesQuery.data;
  const isEmpty = employeesQuery.isSuccess && pageData?.content.length === 0;
  const isSearchActive = search !== "";
  const isStatusFiltered = statusFilter !== DEFAULT_STATUS_FILTER;
  const hasActiveFilters = isSearchActive || isStatusFiltered;

  // Si al cambiar un estado la última página queda vacía, retrocede una página.
  useEffect(() => {
    if (isEmpty && page > 0) {
      setPage((current) => Math.max(0, current - 1));
    }
  }, [isEmpty, page]);

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(0);
  };

  const handleStatusFilterChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setPage(0);
  };

  const handleClearFilters = () => {
    handleClearSearch();
    setStatusFilter(DEFAULT_STATUS_FILTER);
  };

  const handleCreateClick = () => setDialogState({ open: true, employee: null });
  const handleEditClick = (employee: Employee) => setDialogState({ open: true, employee });
  const handleDialogClose = () => setDialogState({ open: false, employee: null });

  const handleDeactivateClick = (employee: Employee) =>
    setStatusTarget({ employee, action: "deactivate" });
  const handleActivateClick = (employee: Employee) =>
    setStatusTarget({ employee, action: "activate" });
  const handleStatusClose = () => setStatusTarget(null);

  return (
    <>
      <PageHeader
        title="Empleados"
        description="Gestioná el equipo que trabaja en tu negocio."
      />
      <EmployeesToolbar
        value={searchInput}
        onChange={setSearchInput}
        onClear={handleClearSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onCreateClick={handleCreateClick}
      />

      {employeesQuery.isPending && <EmployeesSkeleton />}

      {employeesQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar los empleados"
          error={employeesQuery.error}
          onRetry={() => void employeesQuery.refetch()}
          isRetrying={employeesQuery.isFetching}
        />
      )}

      {employeesQuery.isSuccess && pageData && (
        isEmpty ? (
          <EmptyState
            icon={
              hasActiveFilters ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <BadgeOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={hasActiveFilters ? "No se encontraron empleados" : "No hay empleados registrados"}
            description={
              hasActiveFilters
                ? "Probá con otro nombre de búsqueda o cambiá el filtro de estado."
                : "Todavía no cargaste empleados para tu negocio."
            }
            actionLabel={hasActiveFilters ? "Limpiar filtros" : "Crear primer empleado"}
            onAction={hasActiveFilters ? handleClearFilters : handleCreateClick}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              opacity: employeesQuery.isFetching ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {employeesQuery.isFetching && <LinearProgress />}
            <EmployeesTable
              employees={pageData.content}
              onEdit={handleEditClick}
              onDeactivate={handleDeactivateClick}
              onActivate={handleActivateClick}
            />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 2, m: 0 }}
            >
              {pageData.content.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onEdit={handleEditClick}
                  onDeactivate={handleDeactivateClick}
                  onActivate={handleActivateClick}
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
        )
      )}

      <EmployeeDialog
        open={dialogState.open}
        employee={dialogState.employee}
        onClose={handleDialogClose}
        onSuccess={(message) => notify(message)}
      />
      <EmployeeStatusDialog target={statusTarget} onClose={handleStatusClose} onNotify={notify} />
      <SuccessSnackbar
        open={snackbar !== null}
        message={snackbar?.message ?? ""}
        severity={snackbar?.severity}
        onClose={() => setSnackbar(null)}
      />
    </>
  );
}
