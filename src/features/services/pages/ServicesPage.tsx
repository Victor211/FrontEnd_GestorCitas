import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { PageHeader } from "../../../components/layout/PageHeader";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { DeleteServiceDialog } from "../components/DeleteServiceDialog";
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
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

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
      ...(search ? { name: search } : {}),
    }),
    [page, pageSize, search],
  );

  const servicesQuery = useServices(filters);
  const pageData = servicesQuery.data;
  const isEmpty = servicesQuery.isSuccess && pageData?.content.length === 0;
  const isSearchActive = search !== "";

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(0);
  };

  const handleCreateClick = () => setDialogState({ open: true, service: null });
  const handleEditClick = (service: Service) => setDialogState({ open: true, service });
  const handleDialogClose = () => setDialogState({ open: false, service: null });

  const handleDeleteClick = (service: Service) => setDeleteTarget(service);
  const handleDeleteClose = () => setDeleteTarget(null);

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
              isSearchActive ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <DesignServicesOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={isSearchActive ? "No se encontraron servicios" : "No hay servicios registrados"}
            description={
              isSearchActive
                ? "Probá con otro nombre de búsqueda."
                : "Todavía no cargaste servicios para tu negocio."
            }
            actionLabel={isSearchActive ? "Limpiar búsqueda" : "Crear primer servicio"}
            onAction={isSearchActive ? handleClearSearch : handleCreateClick}
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
              onDelete={handleDeleteClick}
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

      <ServiceDialog
        open={dialogState.open}
        service={dialogState.service}
        onClose={handleDialogClose}
        onSuccess={setSnackbarMessage}
      />
      <DeleteServiceDialog
        service={deleteTarget}
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
