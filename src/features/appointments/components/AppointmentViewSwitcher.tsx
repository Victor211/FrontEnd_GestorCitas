import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { AppointmentViewMode } from "../utils/appointmentViewPreference";

interface AppointmentViewSwitcherProps {
  value: AppointmentViewMode;
  onChange: (mode: AppointmentViewMode) => void;
}

export function AppointmentViewSwitcher({ value, onChange }: AppointmentViewSwitcherProps) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      aria-label="Vista de la agenda"
      onChange={(_event, newValue: AppointmentViewMode | null) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
    >
      <ToggleButton value="calendar" aria-label="Vista de calendario">
        <CalendarMonthOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Calendario
      </ToggleButton>
      <ToggleButton value="list" aria-label="Vista de lista">
        <ViewListOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
        Lista
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
