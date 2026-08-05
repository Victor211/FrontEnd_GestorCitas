import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

interface CustomersToolbarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onCreateClick: () => void;
  onPhoneSearchClick: () => void;
}

export function CustomersToolbar({
  value,
  onChange,
  onClear,
  onCreateClick,
  onPhoneSearchClick,
}: CustomersToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ mb: 2 }}
    >
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nombre o apellido..."
        size="small"
        fullWidth
        aria-label="Buscar clientes por nombre o apellido"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton aria-label="Limpiar búsqueda" onClick={onClear} size="small" edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
      />
      <Button
        variant="outlined"
        startIcon={<PhoneOutlinedIcon />}
        onClick={onPhoneSearchClick}
        sx={{ whiteSpace: "nowrap" }}
      >
        Buscar por teléfono
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        sx={{ whiteSpace: "nowrap" }}
      >
        Nuevo cliente
      </Button>
    </Stack>
  );
}
