import {
  Avatar,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { ManagedUser } from "../types/user.types";
import { getRoleLabel } from "../utils/userDisplay";
import { UserStatusAction } from "./UserStatusAction";

interface UsersTableProps {
  users: ManagedUser[];
  currentUserId: number | null;
  onToggleStatus: (user: ManagedUser) => void;
}

export function UsersTable({ users, currentUserId, onToggleStatus }: UsersTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table aria-label="Usuarios">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Correo electrónico</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const isCurrentUser = user.id === currentUserId;
            return (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
                      {getInitials(user.firstName, user.lastName)}
                    </Avatar>
                    <Typography variant="body2">
                      {user.firstName} {user.lastName}
                      {isCurrentUser && (
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          (vos)
                        </Typography>
                      )}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={getRoleLabel(user.role)}
                    size="small"
                    variant="outlined"
                    color={user.role === "OWNER" ? "primary" : "default"}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.active ? "Activo" : "Inactivo"}
                    color={user.active ? "success" : "default"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <UserStatusAction
                    user={user}
                    isCurrentUser={isCurrentUser}
                    onToggle={onToggleStatus}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
