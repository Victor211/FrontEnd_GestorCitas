import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import type { Employee } from "../types/employee.types";
import { getEmployeeInitials } from "../utils/initials";
import { EmployeeServicesChips } from "./EmployeeServicesChips";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <Avatar sx={{ bgcolor: employee.color, width: 36, height: 36, fontSize: 14 }}>
            {getEmployeeInitials(employee.firstName, employee.lastName)}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {fullName}
              </Typography>
              <Chip
                label={employee.active ? "Activo" : "Inactivo"}
                color={employee.active ? "success" : "default"}
                size="small"
                variant="outlined"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {employee.phone || "Sin teléfono"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {employee.email || "Sin correo"}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <EmployeeServicesChips services={employee.services} max={3} />
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <IconButton aria-label={`Editar ${fullName}`} onClick={() => onEdit(employee)} size="small">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Eliminar ${fullName}`}
            onClick={() => onDelete(employee)}
            size="small"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
