import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import {
  customerFormDefaultValues,
  normalizeCustomerPayload,
  toCustomerFormValues,
  type CustomerFormValues,
} from "../schemas/customer.schema";
import type { Customer } from "../types/customer.types";
import { CustomerForm } from "./CustomerForm";

const FORM_ID = "customer-form";

interface CustomerDialogProps {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function CustomerDialog({ open, customer, onClose, onSuccess }: CustomerDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEditMode = customer !== null;

  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleClose = () => {
    if (mutation.isPending) {
      return;
    }
    createMutation.reset();
    updateMutation.reset();
    onClose();
  };

  const handleSubmit = (values: CustomerFormValues) => {
    const request = normalizeCustomerPayload(values);

    if (customer) {
      updateMutation.mutate(
        { id: customer.id, request },
        {
          onSuccess: () => {
            onSuccess("Cliente actualizado correctamente.");
            onClose();
          },
        },
      );
      return;
    }

    createMutation.mutate(request, {
      onSuccess: () => {
        onSuccess("Cliente creado correctamente.");
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={fullScreen}
      aria-labelledby="customer-dialog-title"
    >
      <DialogTitle
        id="customer-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {isEditMode ? "Editar cliente" : "Nuevo cliente"}
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={mutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormErrorAlert
            message={mutation.isError ? getApiErrorMessage(mutation.error) : null}
          />
          <CustomerForm
            key={customer ? `edit-${customer.id}` : "create"}
            formId={FORM_ID}
            defaultValues={customer ? toCustomerFormValues(customer) : customerFormDefaultValues}
            onSubmit={handleSubmit}
            disabled={mutation.isPending}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={mutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={mutation.isPending}
          startIcon={mutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined}
        >
          {mutation.isPending ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
