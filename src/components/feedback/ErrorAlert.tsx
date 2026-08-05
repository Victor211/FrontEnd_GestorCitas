import RefreshIcon from "@mui/icons-material/Refresh";
import { Alert, AlertTitle, Button } from "@mui/material";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

interface ErrorAlertProps {
  title: string;
  error: unknown;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function ErrorAlert({ title, error, onRetry, isRetrying = false }: ErrorAlertProps) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      role="alert"
      sx={{ borderRadius: 3 }}
      action={
        onRetry ? (
          <Button
            color="inherit"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            disabled={isRetrying}
          >
            {isRetrying ? "Reintentando..." : "Reintentar"}
          </Button>
        ) : undefined
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {getApiErrorMessage(error)}
    </Alert>
  );
}
