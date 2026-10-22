import AddIcon from "@mui/icons-material/Add";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { Button, LinearProgress, Paper, Stack, TablePagination } from "@mui/material";
import { useMemo, useState } from "react";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { SuccessSnackbar } from "../../../components/feedback/SuccessSnackbar";
import { PageHeader } from "../../../components/layout/PageHeader";
import { useAuth } from "../../auth/hooks/useAuth";
import { UserCard } from "../components/UserCard";
import { UserDialog } from "../components/UserDialog";
import { UserStatusDialog } from "../components/UserStatusDialog";
import { UsersSkeleton } from "../components/UsersSkeleton";
import { UsersTable } from "../components/UsersTable";
import { useUsers } from "../hooks/useUsers";
import type { ManagedUser, UserFilters } from "../types/user.types";

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export function UsersPage() {
  const { user: currentUser } = useAuth();
  const currentUserId = currentUser?.id ?? null;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [createOpen, setCreateOpen] = useState(false);
  const [statusTarget, setStatusTarget] = useState<ManagedUser | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const filters: UserFilters = useMemo(() => ({ page, size: pageSize }), [page, pageSize]);

  const usersQuery = useUsers(filters);
  const pageData = usersQuery.data;
  const isEmpty = usersQuery.isSuccess && pageData?.content.length === 0;

  return (
    <>
      <PageHeader
        title="Usuarios"
        description="Administrá las cuentas que pueden acceder a tu negocio."
      />
      <Stack direction="row" sx={{ justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
          sx={{ whiteSpace: "nowrap", width: { xs: "100%", sm: "auto" } }}
        >
          Nuevo usuario
        </Button>
      </Stack>

      {usersQuery.isPending && <UsersSkeleton />}

      {usersQuery.isError && (
        <ErrorAlert
          title="No se pudieron cargar los usuarios"
          error={usersQuery.error}
          onRetry={() => void usersQuery.refetch()}
          isRetrying={usersQuery.isFetching}
        />
      )}

      {usersQuery.isSuccess &&
        pageData &&
        (isEmpty ? (
          <EmptyState
            icon={<ManageAccountsOutlinedIcon sx={{ fontSize: 36 }} color="disabled" />}
            title="No hay usuarios para mostrar"
            description="Todavía no hay usuarios registrados en tu negocio."
            actionLabel="Crear usuario"
            onAction={() => setCreateOpen(true)}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              opacity: usersQuery.isFetching ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {usersQuery.isFetching && <LinearProgress />}
            <UsersTable
              users={pageData.content}
              currentUserId={currentUserId}
              onToggleStatus={setStatusTarget}
            />
            <Stack
              component="ul"
              spacing={1.5}
              sx={{ display: { xs: "flex", md: "none" }, p: 2, m: 0 }}
            >
              {pageData.content.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isCurrentUser={user.id === currentUserId}
                  onToggleStatus={setStatusTarget}
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

      <UserDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={setSnackbarMessage}
      />
      <UserStatusDialog
        user={statusTarget}
        onClose={() => setStatusTarget(null)}
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
