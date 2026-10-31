import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar, Box, Card, CardContent, Chip, Button, IconButton, Stack, Typography } from "@mui/material";
import { getInitials } from "../../../utils/getInitials";
import type { Customer } from "../types/customer.types";

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onPermanentDelete?: (customer: Customer) => void;
}

export function CustomerCard({ customer, onEdit, onDelete, onPermanentDelete }: CustomerCardProps) {
  const fullName = `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

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
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "flex-end", flexWrap: "wrap", mt: 1.5 }}
        >
          <IconButton aria-label={`Editar ${fullName}`} onClick={() => onEdit(customer)} size="small">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={`Desactivar ${fullName}`}
            onClick={() => onDelete(customer)}
            size="small"
          >
            <BlockOutlinedIcon fontSize="small" />
          </IconButton>
          {onPermanentDelete && true && (
            <Button
              size="small"
              color="error"
              startIcon={<DeleteForeverOutlinedIcon fontSize="small" />}
              aria-label={`Eliminar definitivamente ${fullName}`}
              onClick={() => onPermanentDelete(customer)}
            >
              Eliminar definitivamente
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
