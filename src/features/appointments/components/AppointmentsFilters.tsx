import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import type { AppointmentStatus } from "../types/appointment.types";
import { CustomerSelect } from "./CustomerSelect";
import { EmployeeSelect } from "./EmployeeSelect";
import { StatusSelect } from "./StatusSelect";

export interface AppointmentFiltersValue {
  employeeId: number;
  customerId: number;
  status: AppointmentStatus | "";
  from: string;
  to: string;
}

const EMPTY_APPOINTMENT_FILTERS: AppointmentFiltersValue = {
  employeeId: 0,
  customerId: 0,
  status: "",
  from: "",
  to: "",
};

interface AppointmentsFiltersProps {
  onApply: (filters: AppointmentFiltersValue) => void;
  onClear: () => void;
}

export function AppointmentsFilters({ onApply, onClear }: AppointmentsFiltersProps) {
  const [draft, setDraft] = useState<AppointmentFiltersValue>(EMPTY_APPOINTMENT_FILTERS);

  const handleClear = () => {
    setDraft(EMPTY_APPOINTMENT_FILTERS);
    onClear();
  };

  return (
    <Box
      component="section"
      aria-label="Filtros de citas"
      sx={{ p: 2, mb: 2, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
    >
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
        }}
      >
        <CustomerSelect
          value={draft.customerId}
          onChange={(customerId) => setDraft((prev) => ({ ...prev, customerId }))}
          required={false}
        />
        <EmployeeSelect
          value={draft.employeeId}
          onChange={(employeeId) => setDraft((prev) => ({ ...prev, employeeId }))}
          required={false}
        />
        <StatusSelect
          value={draft.status}
          onChange={(status) => setDraft((prev) => ({ ...prev, status }))}
        />
        <TextField
          type="datetime-local"
          label="Desde"
          value={draft.from}
          onChange={(event) => setDraft((prev) => ({ ...prev, from: event.target.value }))}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          type="datetime-local"
          label="Hasta"
          value={draft.to}
          onChange={(event) => setDraft((prev) => ({ ...prev, to: event.target.value }))}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>
      <Stack direction="row" spacing={1.5} sx={{ mt: 2, justifyContent: "flex-end" }}>
        <Button startIcon={<ClearIcon />} onClick={handleClear}>
          Limpiar filtros
        </Button>
        <Button variant="contained" startIcon={<FilterListIcon />} onClick={() => onApply(draft)}>
          Aplicar filtros
        </Button>
      </Stack>
    </Box>
  );
}
