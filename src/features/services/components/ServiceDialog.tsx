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
import { useCreateService } from "../hooks/useCreateService";
import { useUpdateService } from "../hooks/useUpdateService";
import {
  serviceFormDefaultValues,
  toServiceFormValues,
  toServiceRequest,
  type ServiceFormValues,
} from "../schemas/service.schema";
import type { Service } from "../types/service.types";
import { ServiceForm } from "./ServiceForm";

const FORM_ID = "service-form";

interface ServiceDialogProps {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function ServiceDialog({ open, service, onClose, onSuccess }: ServiceDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEditMode = service !== null;

  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const mutation = isEditMode ? updateMutation : createMutation;

  const handleClose = () => {
    if (mutation.isPending) {
      return;
    }
    createMutation.reset();
    updateMutation.reset();
    onClose();
  };

  const handleSubmit = (values: ServiceFormValues) => {
    const request = toServiceRequest(values);

    if (service) {
      updateMutation.mutate(
        { id: service.id, request },
        {
          onSuccess: () => {
            onSuccess("Servicio actualizado correctamente.");
            onClose();
          },
        },
      );
      return;
    }

    createMutation.mutate(request, {
      onSuccess: () => {
        onSuccess("Servicio creado correctamente.");
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
      aria-labelledby="service-dialog-title"
    >
      <DialogTitle
        id="service-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {isEditMode ? "Editar servicio" : "Nuevo servicio"}
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
          <ServiceForm
            key={service ? `edit-${service.id}` : "create"}
            formId={FORM_ID}
            defaultValues={service ? toServiceFormValues(service) : serviceFormDefaultValues}
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
