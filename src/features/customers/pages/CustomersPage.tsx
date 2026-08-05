import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { CustomerCard } from "../components/CustomerCard";
import { CustomerDialog } from "../components/CustomerDialog";
import { CustomerPhoneSearchDialog } from "../components/CustomerPhoneSearchDialog";
import { CustomersSkeleton } from "../components/CustomersSkeleton";
import { CustomersTable } from "../components/CustomersTable";
import { CustomersToolbar } from "../components/CustomersToolbar";
import { DeleteCustomerDialog } from "../components/DeleteCustomerDialog";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer, CustomerFilters } from "../types/customer.types";

const SEARCH_DEBOUNCE_MS = 400;
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

interface CustomerDialogState {
  open: boolean;
  customer: Customer | null;
}

export function CustomersPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dialogState, setDialogState] = useState<CustomerDialogState>({
    open: false,
    customer: null,
  });
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [phoneSearchOpen, setPhoneSearchOpen] = useState(false);
  const [phoneSearchKey, setPhoneSearchKey] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const filters: CustomerFilters = useMemo(
    () => ({
      page,
      size: pageSize,
      ...(search ? { name: search } : {}),
    }),
    [page, pageSize, search],
  );

  const customersQuery = useCustomers(filters);
  const pageData = customersQuery.data;
  const isEmpty = customersQuery.isSuccess && pageData?.content.length === 0;
  const isSearchActive = search !== "";

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(0);
  };

  const handleCreateClick = () => setDialogState({ open: true, customer: null });
  const handleEditClick = (customer: Customer) => setDialogState({ open: true, customer });
  const handleDialogClose = () => setDialogState({ open: false, customer: null });

  const handleDeleteClick = (customer: Customer) => setDeleteTarget(customer);
  const handleDeleteClose = () => setDeleteTarget(null);

  const handleEditFromPhoneSearch = (customer: Customer) => {
    setPhoneSearchOpen(false);
    setDialogState({ open: true, customer });
  };

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Consultá y administrá la base de clientes de tu negocio."
      />
      <CustomersToolbar
        value={searchInput}
        onChange={setSearchInput}
        onClear={handleClearSearch}
        onCreateClick={handleCreateClick}
        onPhoneSearchClick={() => {
          setPhoneSearchKey((key) => key + 1);
          setPhoneSearchOpen(true);
        }}
      />

      {customersQuery.isPending && <CustomersSkeleton />}

      {customersQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar los clientes"
          error={customersQuery.error}
          onRetry={() => void customersQuery.refetch()}
          isRetrying={customersQuery.isFetching}
        />
      )}

      {customersQuery.isSuccess && pageData && (
        isEmpty ? (
          <EmptyState
            icon={
              isSearchActive ? (
                <SearchOffOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              ) : (
                <PeopleAltOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />
              )
            }
            title={isSearchActive ? "No se encontraron clientes" : "No hay clientes registrados"}
            description={
              isSearchActive
                ? "Probá con otro nombre o apellido."
                : "Todavía no cargaste clientes para tu negocio."
            }
            actionLabel={isSearchActive ? "Limpiar búsqueda" : "Crear primer cliente"}
            onAction={isSearchActive ? handleClearSearch : handleCreateClick}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              opacity: customersQuery.isFetching ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {customersQuery.isFetching && <LinearProgress />}
            <CustomersTable
              customers={pageData.content}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 2, m: 0 }}
            >
              {pageData.content.map((customer) => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
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

      <CustomerDialog
        open={dialogState.open}
        customer={dialogState.customer}
        onClose={handleDialogClose}
        onSuccess={setSnackbarMessage}
      />
      <DeleteCustomerDialog
        customer={deleteTarget}
        onClose={handleDeleteClose}
        onSuccess={setSnackbarMessage}
      />
      <CustomerPhoneSearchDialog
        key={phoneSearchKey}
        open={phoneSearchOpen}
        onClose={() => setPhoneSearchOpen(false)}
        onEditCustomer={handleEditFromPhoneSearch}
      />
      <SuccessSnackbar
        open={snackbarMessage !== null}
        message={snackbarMessage ?? ""}
        onClose={() => setSnackbarMessage(null)}
      />
    </>
  );
}
