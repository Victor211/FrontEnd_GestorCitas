import type {
  DatesSetArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  GlobalStyles,
  LinearProgress,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { useEmployees } from "../../employees/hooks/useEmployees";
import { useAppointments } from "../hooks/useAppointments";
import type { AppointmentCalendarEventProps } from "../types/calendarEvent.types";
import type { Appointment } from "../types/appointment.types";
import { mapAppointmentToCalendarEvent } from "../utils/appointmentCalendarMapper";
import {
  CALENDAR_QUERY_PAGE_SIZE,
  CALENDAR_TIME_CONFIG,
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_WEEK,
  type CalendarViewType,
} from "../utils/calendarConfig";
import { toCalendarDateRange, type CalendarDateRange } from "../utils/calendarDateRange";
import { buildEmployeeColorMap } from "../utils/employeeColorMap";
import { getCalendarGlobalStyles } from "../utils/calendarGlobalStyles";
import { CalendarEventContent } from "./CalendarEventContent";
import { CalendarFilters, type CalendarFiltersValue } from "./CalendarFilters";
import { CalendarSkeleton } from "./CalendarSkeleton";
import { CalendarToolbar } from "./CalendarToolbar";

const EMPLOYEES_SELECTOR_PARAMS = { page: 0, size: 100 };

const EMPTY_CALENDAR_FILTERS: CalendarFiltersValue = {
  employeeId: 0,
  serviceId: 0,
  status: "",
};

function isCalendarViewType(value: string): value is CalendarViewType {
  return (
    value === CALENDAR_VIEW_WEEK || value === CALENDAR_VIEW_DAY || value === CALENDAR_VIEW_MONTH
  );
}

interface AppointmentsCalendarProps {
  onViewDetail: (appointment: Appointment) => void;
  onCreateClick: () => void;
}

export function AppointmentsCalendar({ onViewDetail, onCreateClick }: AppointmentsCalendarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const calendarRef = useRef<FullCalendar>(null);

  const [filters, setFilters] = useState<CalendarFiltersValue>(EMPTY_CALENDAR_FILTERS);
  const [range, setRange] = useState<CalendarDateRange | null>(null);
  const [title, setTitle] = useState("");
  const [activeView, setActiveView] = useState<CalendarViewType>(() =>
    isMobile ? CALENDAR_VIEW_DAY : CALENDAR_VIEW_WEEK,
  );

  useEffect(() => {
    if (!isMobile) {
      return;
    }
    const api = calendarRef.current?.getApi();
    if (api && api.view.type !== CALENDAR_VIEW_DAY) {
      api.changeView(CALENDAR_VIEW_DAY);
    }
  }, [isMobile]);

  const employeesQuery = useEmployees(EMPLOYEES_SELECTOR_PARAMS);
  const employeeColors = useMemo(
    () => buildEmployeeColorMap(employeesQuery.data?.content ?? []),
    [employeesQuery.data],
  );

  const appointmentsQuery = useAppointments(
    {
      page: 0,
      size: CALENDAR_QUERY_PAGE_SIZE,
      from: range?.from,
      to: range?.to,
      employeeId: filters.employeeId || undefined,
      status: filters.status || undefined,
    },
    { enabled: range !== null },
  );

  const visibleAppointments = useMemo(() => {
    const content = appointmentsQuery.data?.content ?? [];
    return filters.serviceId
      ? content.filter((appointment) => appointment.serviceId === filters.serviceId)
      : content;
  }, [appointmentsQuery.data, filters.serviceId]);

  const events = useMemo(
    () =>
      visibleAppointments.map((appointment) =>
        mapAppointmentToCalendarEvent(appointment, employeeColors, theme.palette.primary.main),
      ),
    [visibleAppointments, employeeColors, theme.palette.primary.main],
  );

  const isOverLimit = (appointmentsQuery.data?.totalElements ?? 0) > CALENDAR_QUERY_PAGE_SIZE;
  const isEmptyRange = appointmentsQuery.isSuccess && visibleAppointments.length === 0;

  const handleDatesSet = (arg: DatesSetArg) => {
    setRange(toCalendarDateRange(arg.start, arg.end));
    setTitle(arg.view.title);
    if (isCalendarViewType(arg.view.type)) {
      setActiveView(arg.view.type);
    }
  };

  const handleEventClick = (arg: EventClickArg) => {
    const { appointment } = arg.event.extendedProps as AppointmentCalendarEventProps;
    onViewDetail(appointment);
  };

  const getApi = () => calendarRef.current?.getApi();

  return (
    <Box>
      <GlobalStyles styles={getCalendarGlobalStyles(theme)} />
      <CalendarToolbar
        title={title}
        activeView={activeView}
        onPrev={() => getApi()?.prev()}
        onToday={() => getApi()?.today()}
        onNext={() => getApi()?.next()}
        onChangeView={(view) => getApi()?.changeView(view)}
        onRefresh={() => void appointmentsQuery.refetch()}
        isFetching={appointmentsQuery.isFetching}
      />

      <CalendarFilters
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_CALENDAR_FILTERS)}
      />

      {appointmentsQuery.isError && (
        <Box sx={{ mb: 2 }}>
          <ErrorAlert
            title="No se pudieron cargar las citas"
            error={appointmentsQuery.error}
            onRetry={() => void appointmentsQuery.refetch()}
            isRetrying={appointmentsQuery.isFetching}
          />
        </Box>
      )}

      {isOverLimit && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
          Este período tiene más de {CALENDAR_QUERY_PAGE_SIZE} citas. Algunas podrían no
          mostrarse; ajustá los filtros o el rango de fechas para acotarlo.
        </Alert>
      )}

      {isEmptyRange && (
        <Alert
          severity="info"
          sx={{ mb: 2, borderRadius: 2 }}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<AddIcon fontSize="small" />}
              onClick={onCreateClick}
            >
              Nueva cita
            </Button>
          }
        >
          No hay citas en este período.
        </Alert>
      )}

      <Box sx={{ position: "relative" }}>
        {appointmentsQuery.isPending && (
          <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
            <CalendarSkeleton />
          </Box>
        )}
        <Paper
          variant="outlined"
          className="appointments-calendar"
          sx={{
            borderRadius: 3,
            p: 2,
            opacity: appointmentsQuery.isPending ? 0 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {appointmentsQuery.isFetching && !appointmentsQuery.isPending && (
            <LinearProgress sx={{ mb: 1 }} />
          )}
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={activeView}
            headerToolbar={false}
            locale={esLocale}
            timeZone="local"
            height="auto"
            {...CALENDAR_TIME_CONFIG}
            events={events}
            eventContent={(arg: EventContentArg) => <CalendarEventContent arg={arg} />}
            eventClick={handleEventClick}
            datesSet={handleDatesSet}
          />
        </Paper>
      </Box>
    </Box>
  );
}
