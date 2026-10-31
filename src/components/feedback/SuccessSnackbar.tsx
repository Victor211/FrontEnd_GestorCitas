import { Alert, Snackbar } from "@mui/material";

interface SuccessSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "info";
  onClose: () => void;
}

export function SuccessSnackbar({
  open,
  message,
  severity = "success",
  onClose,
}: SuccessSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={(_event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        onClose();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} variant="filled" onClose={onClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
