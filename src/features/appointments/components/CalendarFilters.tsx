import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { AppointmentStatus } from "../types/appointment.types";
import { EmployeeSelect } from "./EmployeeSelect";
import { ServiceSelect } from "./ServiceSelect";
import { StatusSelect } from "./StatusSelect";

export interface CalendarFiltersValue {
  employeeId: number;
  serviceId: number;
  status: AppointmentStatus | "";
}

interface CalendarFiltersProps {
  value: CalendarFiltersValue;
  onChange: (value: CalendarFiltersValue) => void;
  onClear: () => void;
}

function countActiveFilters(value: CalendarFiltersValue): number {
  return [value.employeeId, value.serviceId, value.status].filter(Boolean).length;
}

export function CalendarFilters({ value, onChange, onClear }: CalendarFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const activeCount = countActiveFilters(value);

  const fields = (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" },
      }}
    >
      <EmployeeSelect
        value={value.employeeId}
        onChange={(employeeId) => onChange({ ...value, employeeId })}
        required={false}
      />
      <ServiceSelect
        value={value.serviceId}
        onChange={(serviceId) => onChange({ ...value, serviceId })}
        required={false}
      />
      <StatusSelect value={value.status} onChange={(status) => onChange({ ...value, status })} />
    </Box>
  );

  const clearButton = (
    <Button
      startIcon={<ClearIcon />}
      onClick={onClear}
      disabled={activeCount === 0}
      size="small"
    >
      Limpiar filtros
    </Button>
  );

  if (isMobile) {
    return (
      <Accordion
        variant="outlined"
        sx={{ mb: 2, borderRadius: 3, "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Badge badgeContent={activeCount} color="primary">
              <FilterListIcon fontSize="small" />
            </Badge>
            <Typography variant="body2">Filtros</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            {fields}
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              {clearButton}
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Box
      component="section"
      aria-label="Filtros del calendario"
      sx={{ p: 2, mb: 2, border: "1px solid", borderColor: "divider", borderRadius: 3 }}
    >
      {fields}
      <Stack direction="row" sx={{ mt: 2, justifyContent: "flex-end" }}>
        {clearButton}
      </Stack>
    </Box>
  );
}
