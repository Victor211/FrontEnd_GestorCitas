import { Alert } from "@mui/material";

interface FormErrorAlertProps {
  message: string | null;
}

export function FormErrorAlert({ message }: FormErrorAlertProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert severity="error" role="alert">
      {message}
    </Alert>
  );
}
