import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Box, Button, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { Employee } from "../types/employee.types";
import { EmployeeServicesChips } from "./EmployeeServicesChips";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
  onActivate: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onEdit, onDeactivate, onActivate }: EmployeeCardProps) {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <Avatar sx={{ bgcolor: employee.color, width: 36, height: 36, fontSize: 14 }}>
            {getInitials(employee.firstName, employee.lastName)}
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
          {employee.active ? (
            <>
              <IconButton aria-label={`Editar ${fullName}`} onClick={() => onEdit(employee)} size="small">
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`Desactivar ${fullName}`}
                onClick={() => onDeactivate(employee)}
                size="small"
              >
                <BlockOutlinedIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Button
              size="small"
              color="success"
              startIcon={<CheckCircleOutlineIcon fontSize="small" />}
              aria-label={`Activar ${fullName}`}
              onClick={() => onActivate(employee)}
            >
              Activar
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
