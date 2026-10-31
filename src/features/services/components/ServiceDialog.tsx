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
import { isConflictError } from "../../../utils/statusMutationError";
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

  // En un 409 por datos duplicados puede existir un registro inactivo con los mismos datos:
  // se orienta al usuario sin afirmarlo, porque la API no lo informa.
  const getMutationErrorMessage = (error: unknown) => {
    const message = getApiErrorMessage(error);
    return isConflictError(error)
      ? `${message} Revisá también el filtro "Inactivos" de la lista: si ya existe un registro inactivo, podés activarlo desde allí.`
      : message;
  };

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
            message={mutation.isError ? getMutationErrorMessage(mutation.error) : null}
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
