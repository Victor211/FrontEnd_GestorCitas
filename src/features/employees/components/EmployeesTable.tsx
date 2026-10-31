import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
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
import type { Employee } from "../types/employee.types";
import { EmployeeServicesChips } from "./EmployeeServicesChips";

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
  onActivate: (employee: Employee) => void;
}

export function EmployeesTable({ employees, onEdit, onDeactivate, onActivate }: EmployeesTableProps) {
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
                      {getInitials(employee.firstName, employee.lastName)}
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
                  {employee.active ? (
                      <>
                        <Tooltip title="Editar empleado">
                          <IconButton
                            aria-label={`Editar ${fullName}`}
                            onClick={() => onEdit(employee)}
                            size="small"
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Desactivar empleado">
                          <IconButton
                            aria-label={`Desactivar ${fullName}`}
                            onClick={() => onDeactivate(employee)}
                            size="small"
                          >
                            <BlockOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <Tooltip title="Activar empleado">
                        <IconButton
                          aria-label={`Activar ${fullName}`}
                          onClick={() => onActivate(employee)}
                          size="small"
                          color="success"
                        >
                          <CheckCircleOutlineIcon fontSize="small" />
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
