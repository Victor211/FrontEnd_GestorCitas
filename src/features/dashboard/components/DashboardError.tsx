import RefreshIcon from "@mui/icons-material/Refresh";
import { Alert, AlertTitle, Button } from "@mui/material";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";

interface DashboardErrorProps {
  error: unknown;
  onRetry: () => void;
  isRetrying: boolean;
}

export function DashboardError({ error, onRetry, isRetrying }: DashboardErrorProps) {
  return (
    <Alert
      severity="error"
      variant="outlined"
      role="alert"
      sx={{ borderRadius: 3 }}
      action={
        <Button
          color="inherit"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? "Reintentando..." : "Reintentar"}
        </Button>
      }
    >
      <AlertTitle>No se pudo cargar el Dashboard</AlertTitle>
      {getApiErrorMessage(error)}
    </Alert>
  );
}
