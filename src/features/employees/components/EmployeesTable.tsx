import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
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
import type { Employee } from "../types/employee.types";
import { getEmployeeInitials } from "../utils/initials";
import { EmployeeServicesChips } from "./EmployeeServicesChips";

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeesTable({ employees, onEdit, onDelete }: EmployeesTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table aria-label="Empleados">
        <TableHead>
          <TableRow>
            <TableCell>Empleado</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Servicios</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => {
            const fullName = `${employee.firstName} ${employee.lastName}`;
            return (
              <TableRow key={employee.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <Avatar
                      sx={{ bgcolor: employee.color, width: 32, height: 32, fontSize: 13 }}
                    >
                      {getEmployeeInitials(employee.firstName, employee.lastName)}
                    </Avatar>
                    <Typography variant="body2">{fullName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  {employee.phone || (
                    <Typography variant="body2" color="text.secondary" component="span">
                      Sin teléfono
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {employee.email || (
                    <Typography variant="body2" color="text.secondary" component="span">
                      Sin correo
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ maxWidth: 260 }}>
                  <EmployeeServicesChips services={employee.services} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={employee.active ? "Activo" : "Inactivo"}
                    color={employee.active ? "success" : "default"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar empleado">
                    <IconButton
                      aria-label={`Editar ${fullName}`}
                      onClick={() => onEdit(employee)}
                      size="small"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar empleado">
                    <IconButton
                      aria-label={`Eliminar ${fullName}`}
                      onClick={() => onDelete(employee)}
                      size="small"
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
