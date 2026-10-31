import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { Customer } from "../types/customer.types";

interface CustomersTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onPermanentDelete?: (customer: Customer) => void;
}

export function CustomersTable({ customers, onEdit, onDelete, onPermanentDelete }: CustomersTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table aria-label="Clientes">
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Notas</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => {
            const fullName = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();
            return (
              <TableRow key={customer.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
                      {getInitials(customer.firstName, customer.lastName)}
                    </Avatar>
                    <Typography variant="body2">{fullName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {customer.email || (
                    <Typography variant="body2" color="text.secondary" component="span">
                      Sin correo
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ maxWidth: 220 }}>
                  {customer.notes ? (
                    <Tooltip title={customer.notes}>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {customer.notes}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="body2" color="text.secondary" component="span">
                      —
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip
                    label={customer.active ? "Activo" : "Inactivo"}
                    color={customer.active ? "success" : "default"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar cliente">
                    <IconButton
                      aria-label={`Editar ${fullName}`}
                      onClick={() => onEdit(customer)}
                      size="small"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Desactivar cliente">
                    <IconButton
                      aria-label={`Desactivar ${fullName}`}
                      onClick={() => onDelete(customer)}
                      size="small"
                    >
                      <BlockOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {onPermanentDelete && true && (
                    <Tooltip title="Eliminar definitivamente">
                      <IconButton
                        aria-label={`Eliminar definitivamente ${fullName}`}
                        onClick={() => onPermanentDelete(customer)}
                        size="small"
                        color="error"
                      >
                        <DeleteForeverOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
