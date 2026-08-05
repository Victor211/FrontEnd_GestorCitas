import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { useCustomerByPhone } from "../hooks/useCustomerByPhone";
import type { Customer } from "../types/customer.types";
import { CustomerPhoneResult } from "./CustomerPhoneResult";

interface CustomerPhoneSearchDialogProps {
  open: boolean;
  onClose: () => void;
  onEditCustomer: (customer: Customer) => void;
}

export function CustomerPhoneSearchDialog({
  open,
  onClose,
  onEditCustomer,
}: CustomerPhoneSearchDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [phoneInput, setPhoneInput] = useState("");
  const [searchedPhone, setSearchedPhone] = useState("");

  const query = useCustomerByPhone(searchedPhone);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = phoneInput.trim();
    if (trimmed) {
      setSearchedPhone(trimmed);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      fullScreen={fullScreen}
      aria-labelledby="customer-phone-search-title"
    >
      <DialogTitle
        id="customer-phone-search-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        Buscar por teléfono
        <IconButton aria-label="Cerrar" onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Stack component="form" spacing={2} onSubmit={handleSearch}>
          <TextField
            value={phoneInput}
            onChange={(event) => setPhoneInput(event.target.value)}
            label="Teléfono"
            placeholder="+595981111111"
            autoFocus
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            disabled={!phoneInput.trim()}
          >
            Buscar
          </Button>
          {searchedPhone && <CustomerPhoneResult query={query} onEditCustomer={onEditCustomer} />}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
