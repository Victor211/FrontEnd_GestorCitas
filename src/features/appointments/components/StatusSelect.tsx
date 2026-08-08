import { MenuItem, TextField } from "@mui/material";
import { getAppointmentStatusConfig } from "../../dashboard/utils/appointmentStatus";
import type { AppointmentStatus } from "../types/appointment.types";

const STATUS_OPTIONS: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
];

interface StatusSelectProps {
  value: AppointmentStatus | "";
  onChange: (status: AppointmentStatus | "") => void;
  disabled?: boolean;
}

export function StatusSelect({ value, onChange, disabled = false }: StatusSelectProps) {
  return (
    <TextField
      select
      label="Estado"
      value={value}
      onChange={(event) => onChange(event.target.value as AppointmentStatus | "")}
      disabled={disabled}
      fullWidth
    >
      <MenuItem value="">Todos</MenuItem>
      {STATUS_OPTIONS.map((status) => (
        <MenuItem key={status} value={status}>
          {getAppointmentStatusConfig(status).label}
        </MenuItem>
      ))}
    </TextField>
  );
}
