import { alpha, type Theme } from "@mui/material";

export function getCalendarGlobalStyles(theme: Theme) {
  return {
    ".appointments-calendar": {
      "--fc-border-color": theme.palette.divider,
      "--fc-page-bg-color": "transparent",
      "--fc-neutral-bg-color": theme.palette.action.hover,
      "--fc-neutral-text-color": theme.palette.text.secondary,
      "--fc-today-bg-color": alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.16 : 0.08),
      "--fc-now-indicator-color": theme.palette.error.main,
      "--fc-small-font-size": theme.typography.pxToRem(11),
      "--fc-highlight-color": alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.3 : 0.2),
      color: theme.palette.text.primary,
    },
    ".appointments-calendar .fc-timegrid-slot-label, .appointments-calendar .fc-col-header-cell-cushion":
      {
        color: theme.palette.text.secondary,
      },
    ".appointments-calendar .fc-event": {
      cursor: "grab",
      borderWidth: 1,
    },
    ".appointments-calendar .fc-event.fc-appointment-locked": {
      cursor: "default",
    },
    ".appointments-calendar .fc-event.fc-event-dragging": {
      cursor: "grabbing",
    },
    ".appointments-calendar .fc-appointment-pending": {
      borderStyle: "dashed",
    },
    ".appointments-calendar .fc-appointment-no-show": {
      borderStyle: "dotted",
      opacity: 0.85,
    },
    ".appointments-calendar .fc-appointment-cancelled": {
      opacity: 0.55,
    },
    ".appointments-calendar .fc-appointment-cancelled .appointment-event-content": {
      textDecoration: "line-through",
    },
    ".appointments-calendar .fc-appointment-completed": {
      opacity: 0.85,
    },
  } as const;
}
