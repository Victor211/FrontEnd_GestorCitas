import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { PageHeader } from "../../../components/layout/PageHeader";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { DEFAULT_STATUS_FILTER, toActiveParam, type StatusFilter } from "../../../utils/statusFilter";
import { ServiceStatusDialog, type ServiceStatusTarget } from "../components/ServiceStatusDialog";
import { ServiceCard } from "../components/ServiceCard";
import { ServiceDialog } from "../components/ServiceDialog";
import { ServicesSkeleton } from "../components/ServicesSkeleton";
import { ServicesTable } from "../components/ServicesTable";
import { ServicesToolbar } from "../components/ServicesToolbar";
import { useServices } from "../hooks/useServices";
import type { Service, ServicesListParams } from "../types/service.types";

const SEARCH_DEBOUNCE_MS = 400;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

interface ServiceDialogState {
  open: boolean;
  service: Service | null;
}

export function ServicesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogState, setDialogState] = useState<ServiceDialogState>({
    open: false,
    service: null,
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(DEFAULT_STATUS_FILTER);
  const [statusTarget, setStatusTarget] = useState<ServiceStatusTarget | null>(null);
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

  const filters: ServicesListParams = useMemo(
    () => ({
      page,
      size: pageSize,
      active: toActiveParam(statusFilter),
      ...(search ? { name: search } : {}),
    }),
    [page, pageSize, search, statusFilter],
  );

  const servicesQuery = useServices(filters);
  const pageData = servicesQuery.data;
  const isEmpty = servicesQuery.isSuccess && pageData?.content.length === 0;
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

  const handleCreateClick = () => setDialogState({ open: true, service: null });
  const handleEditClick = (service: Service) => setDialogState({ open: true, service });
  const handleDialogClose = () => setDialogState({ open: false, service: null });

  const handleDeactivateClick = (service: Service) =>
    setStatusTarget({ service, action: "deactivate" });
  const handleActivateClick = (service: Service) =>
    setStatusTarget({ service, action: "activate" });
  const handleStatusClose = () => setStatusTarget(null);

  return (
    <>
      <PageHeader
        title="Servicios"
        description="Administrá los servicios que ofrece tu negocio."
      />
      <ServicesToolbar
        value={searchInput}
        onChange={setSearchInput}
        onClear={handleClearSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onCreateClick={handleCreateClick}
      />

      {servicesQuery.isPending && <ServicesSkeleton />}

      {servicesQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar los servicios"
          error={servicesQuery.error}
          onRetry={() => void servicesQuery.refetch()}
          isRetrying={servicesQuery.isFetching}
        />
      )}

      {servicesQuery.isSuccess && pageData && (
        isEmpty ? (
          <EmptyState
            icon={
              hasActiveFilters ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <DesignServicesOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={hasActiveFilters ? "No se encontraron servicios" : "No hay servicios registrados"}
            description={
              hasActiveFilters
                ? "Probá con otro nombre de búsqueda o cambiá el filtro de estado."
                : "Todavía no cargaste servicios para tu negocio."
            }
            actionLabel={hasActiveFilters ? "Limpiar filtros" : "Crear primer servicio"}
            onAction={hasActiveFilters ? handleClearFilters : handleCreateClick}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              opacity: servicesQuery.isFetching ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {servicesQuery.isFetching && <LinearProgress />}
            <ServicesTable
              services={pageData.content}
              onEdit={handleEditClick}
              onDeactivate={handleDeactivateClick}
              onActivate={handleActivateClick}
            />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 2, m: 0 }}
            >
              {pageData.content.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
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

      <ServiceDialog
        open={dialogState.open}
        service={dialogState.service}
        onClose={handleDialogClose}
        onSuccess={(message) => notify(message)}
      />
      <ServiceStatusDialog target={statusTarget} onClose={handleStatusClose} onNotify={notify} />
      <SuccessSnackbar
        open={snackbar !== null}
        message={snackbar?.message ?? ""}
        severity={snackbar?.severity}
        onClose={() => setSnackbar(null)}
      />
    </>
  );
}
