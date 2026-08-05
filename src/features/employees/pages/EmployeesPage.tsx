import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { DeleteEmployeeDialog } from "../components/DeleteEmployeeDialog";
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
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

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
      ...(search ? { name: search } : {}),
    }),
    [page, pageSize, search],
  );

  const employeesQuery = useEmployees(filters);
  const pageData = employeesQuery.data;
  const isEmpty = employeesQuery.isSuccess && pageData?.content.length === 0;
  const isSearchActive = search !== "";

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(0);
  };

  const handleCreateClick = () => setDialogState({ open: true, employee: null });
  const handleEditClick = (employee: Employee) => setDialogState({ open: true, employee });
  const handleDialogClose = () => setDialogState({ open: false, employee: null });

  const handleDeleteClick = (employee: Employee) => setDeleteTarget(employee);
  const handleDeleteClose = () => setDeleteTarget(null);

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
              isSearchActive ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <BadgeOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={isSearchActive ? "No se encontraron empleados" : "No hay empleados registrados"}
            description={
              isSearchActive
                ? "Probá con otro nombre de búsqueda."
                : "Todavía no cargaste empleados para tu negocio."
            }
            actionLabel={isSearchActive ? "Limpiar búsqueda" : "Crear primer empleado"}
            onAction={isSearchActive ? handleClearSearch : handleCreateClick}
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
              onDelete={handleDeleteClick}
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
                  onDelete={handleDeleteClick}
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
        onSuccess={setSnackbarMessage}
      />
      <DeleteEmployeeDialog
        employee={deleteTarget}
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
