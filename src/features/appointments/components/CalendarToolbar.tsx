import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_WEEK,
  type CalendarViewType,
} from "../utils/calendarConfig";

interface CalendarToolbarProps {
  title: string;
  activeView: CalendarViewType;
  onPrev: () => void;
  onToday: () => void;
  onNext: () => void;
  onChangeView: (view: CalendarViewType) => void;
  onRefresh: () => void;
  isFetching: boolean;
}

export function CalendarToolbar({
  title,
  activeView,
  onPrev,
  onToday,
  onNext,
  onChangeView,
  onRefresh,
  isFetching,
}: CalendarToolbarProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ mb: 2, alignItems: { xs: "stretch", sm: "center" }, justifyContent: "space-between" }}
    >
      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
        <IconButton aria-label="Período anterior" onClick={onPrev} size="small">
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Button size="small" onClick={onToday}>
          Hoy
        </Button>
        <IconButton aria-label="Período siguiente" onClick={onNext} size="small">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
          {title}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <ToggleButtonGroup
          value={activeView}
          exclusive
          size="small"
          onChange={(_event, newView: CalendarViewType | null) => {
            if (newView) {
              onChangeView(newView);
            }
          }}
          aria-label="Vista del calendario"
        >
          <ToggleButton value={CALENDAR_VIEW_WEEK} aria-label="Vista semanal">
            Semana
          </ToggleButton>
          <ToggleButton value={CALENDAR_VIEW_DAY} aria-label="Vista diaria">
            Día
          </ToggleButton>
          <ToggleButton value={CALENDAR_VIEW_MONTH} aria-label="Vista mensual">
            Mes
          </ToggleButton>
        </ToggleButtonGroup>
        <Tooltip title="Refrescar">
          <span>
            <IconButton aria-label="Refrescar citas" onClick={onRefresh} disabled={isFetching}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
