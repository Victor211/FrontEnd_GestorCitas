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
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../hooks/useUpdateEmployee";
import {
  employeeFormDefaultValues,
  normalizeEmployeePayload,
  toEmployeeFormValues,
  type EmployeeFormValues,
} from "../schemas/employee.schema";
import type { Employee } from "../types/employee.types";
import { EmployeeForm } from "./EmployeeForm";

const FORM_ID = "employee-form";

interface EmployeeDialogProps {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function EmployeeDialog({ open, employee, onClose, onSuccess }: EmployeeDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isEditMode = employee !== null;

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
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

  const handleSubmit = (values: EmployeeFormValues) => {
    const request = normalizeEmployeePayload(values);

    if (employee) {
      updateMutation.mutate(
        { id: employee.id, request },
        {
          onSuccess: () => {
            onSuccess("Empleado actualizado correctamente.");
            onClose();
          },
        },
      );
      return;
    }

    createMutation.mutate(request, {
      onSuccess: () => {
        onSuccess("Empleado creado correctamente.");
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
      aria-labelledby="employee-dialog-title"
    >
      <DialogTitle
        id="employee-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {isEditMode ? "Editar empleado" : "Nuevo empleado"}
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
          <EmployeeForm
            key={employee ? `edit-${employee.id}` : "create"}
            formId={FORM_ID}
            defaultValues={employee ? toEmployeeFormValues(employee) : employeeFormDefaultValues}
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
