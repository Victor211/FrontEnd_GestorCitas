import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { StatusFilterToggle } from "../../../components/common/StatusFilterToggle";
import type { StatusFilter } from "../../../utils/statusFilter";

interface EmployeesToolbarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  onCreateClick: () => void;
}

export function EmployeesToolbar({
  value,
  onChange,
  onClear,
  statusFilter,
  onStatusFilterChange,
  onCreateClick,
}: EmployeesToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ mb: 2 }}
    >
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por nombre..."
        size="small"
        fullWidth
        aria-label="Buscar empleados por nombre"
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
      <StatusFilterToggle
        value={statusFilter}
        onChange={onStatusFilterChange}
        label="Filtrar empleados por estado"
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreateClick}
        sx={{ whiteSpace: "nowrap" }}
      >
        Nuevo empleado
      </Button>
    </Stack>
  );
}
