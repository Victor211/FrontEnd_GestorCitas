import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import type { EmployeeServiceSummary } from "../types/employee.types";

interface EmployeeServicesChipsProps {
  services: EmployeeServiceSummary[];
  max?: number;
}

export function EmployeeServicesChips({ services, max = 2 }: EmployeeServicesChipsProps) {
  if (services.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        Sin servicios asignados
      </Typography>
    );
  }

  const visible = services.slice(0, max);
  const hidden = services.slice(max);

  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", gap: 0.5 }}>
      {visible.map((service) => (
        <Chip key={service.id} label={service.name} size="small" variant="outlined" />
      ))}
      {hidden.length > 0 && (
        <Tooltip title={hidden.map((service) => service.name).join(", ")}>
          <Chip label={`+${hidden.length}`} size="small" />
        </Tooltip>
      )}
    </Stack>
  );
}
