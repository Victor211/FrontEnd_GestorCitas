import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { getApiErrorMessage, isApiError } from "../../../utils/getApiErrorMessage";
import type { Customer } from "../types/customer.types";

interface CustomerPhoneResultProps {
  query: UseQueryResult<Customer>;
  onEditCustomer: (customer: Customer) => void;
}

export function CustomerPhoneResult({ query, onEditCustomer }: CustomerPhoneResultProps) {
  if (query.isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (query.isError) {
    if (isApiError(query.error) && query.error.status === 404) {
      return (
        <Alert severity="info" icon={<PersonSearchOutlinedIcon fontSize="small" />}>
          Cliente no encontrado.
        </Alert>
      );
    }
    return <Alert severity="error">{getApiErrorMessage(query.error)}</Alert>;
  }

  const customer = query.data;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {customer.firstName} {customer.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {customer.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {customer.email || "Sin correo"}
        </Typography>
        {customer.notes && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {customer.notes}
          </Typography>
        )}
        <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <Button
            size="small"
            startIcon={<EditOutlinedIcon fontSize="small" />}
            onClick={() => onEditCustomer(customer)}
          >
            Editar cliente
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
