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
import { useCreateUser } from "../hooks/useCreateUser";
import { toCreateUserRequest, type UserFormValues } from "../schemas/user.schema";
import { getCreateUserErrorMessage } from "../utils/userDisplay";
import { UserForm } from "./UserForm";

const FORM_ID = "user-form";

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function UserDialog({ open, onClose, onSuccess }: UserDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const createMutation = useCreateUser();

  // reset() descarta las variables de la mutación (incluida la contraseña).
  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }
    createMutation.reset();
    onClose();
  };

  const handleSubmit = (values: UserFormValues) => {
    createMutation.mutate(toCreateUserRequest(values), {
      onSuccess: (user) => {
        createMutation.reset();
        onSuccess(`Usuario "${user.firstName} ${user.lastName}" creado correctamente.`);
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
      aria-labelledby="user-dialog-title"
    >
      <DialogTitle
        id="user-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Nuevo usuario
        <IconButton
          aria-label="Cerrar"
          onClick={handleClose}
          disabled={createMutation.isPending}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <FormErrorAlert
            message={
              createMutation.isError ? getCreateUserErrorMessage(createMutation.error) : null
            }
          />
          <UserForm
            formId={FORM_ID}
            onSubmit={handleSubmit}
            disabled={createMutation.isPending}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} disabled={createMutation.isPending}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form={FORM_ID}
          variant="contained"
          disabled={createMutation.isPending}
          startIcon={
            createMutation.isPending ? <CircularProgress size={16} color="inherit" /> : undefined
          }
        >
          {createMutation.isPending ? "Creando..." : "Crear usuario"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
