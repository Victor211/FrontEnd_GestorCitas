export const CALENDAR_TIME_CONFIG = {
  slotMinTime: "07:00:00",
  slotMaxTime: "21:00:00",
  slotDuration: "00:30:00",
  slotLabelInterval: "01:00:00",
  allDaySlot: false,
  nowIndicator: true,
  scrollTime: "08:00:00",
} as const;

export const CALENDAR_INTERACTION_CONFIG = {
  selectable: true,
  selectMirror: true,
  eventStartEditable: true,
  eventDurationEditable: false,
  eventResizableFromStart: false,
} as const;

export const CALENDAR_QUERY_PAGE_SIZE = 200;

export const CALENDAR_VIEW_WEEK = "timeGridWeek";
export const CALENDAR_VIEW_DAY = "timeGridDay";
export const CALENDAR_VIEW_MONTH = "dayGridMonth";

export type CalendarViewType =
  | typeof CALENDAR_VIEW_WEEK
  | typeof CALENDAR_VIEW_DAY
  | typeof CALENDAR_VIEW_MONTH;
