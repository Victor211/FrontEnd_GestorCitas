import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { Customer } from "../types/customer.types";

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

export function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
  const fullName = `${customer.firstName} ${customer.lastName}`;

  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
            {getInitials(customer.firstName, customer.lastName)}
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
                label={customer.active ? "Activo" : "Inactivo"}
                color={customer.active ? "success" : "default"}
                size="small"
                variant="outlined"
              />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {customer.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {customer.email || "Sin correo"}
            </Typography>
            {customer.notes && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {customer.notes}
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <IconButton aria-label={`Editar ${fullName}`} onClick={() => onEdit(customer)} size="small">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Eliminar ${fullName}`}
            onClick={() => onDelete(customer)}
            size="small"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
