import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { StatusFilter } from "../../utils/statusFilter";

const OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "inactive", label: "Inactivos" },
];

interface StatusFilterToggleProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  label: string;
}

export function StatusFilterToggle({ value, onChange, label }: StatusFilterToggleProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      color="primary"
      value={value}
      aria-label={label}
      onChange={(_event, next: StatusFilter | null) => {
        if (next !== null) {
          onChange(next);
        }
      }}
      sx={{ flexShrink: 0 }}
    >
      {OPTIONS.map((option) => (
        <ToggleButton key={option.value} value={option.value} sx={{ px: 2, flex: { xs: 1, sm: "none" } }}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
