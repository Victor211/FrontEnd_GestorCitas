import dayjs from "dayjs";
import "dayjs/locale/es";

export function formatConversationListTime(isoDate: string | null): string {
  if (!isoDate) {
    return "";
  }

  const date = dayjs(isoDate).locale("es");
  if (!date.isValid()) {
    return "";
  }

  return date.isSame(dayjs(), "day") ? date.format("HH:mm") : date.format("DD/MM");
}

export function formatMessageTime(isoDate: string): string {
  const date = dayjs(isoDate);
  return date.isValid() ? date.format("HH:mm") : "";
}

export function formatMessageDayLabel(isoDate: string): string {
  const date = dayjs(isoDate);
  if (!date.isValid()) {
    return "";
  }

  const today = dayjs();
  if (date.isSame(today, "day")) {
    return "Hoy";
  }
  if (date.isSame(today.subtract(1, "day"), "day")) {
    return "Ayer";
  }
  return date.isSame(today, "year") ? date.format("DD/MM") : date.format("DD/MM/YYYY");
}

export function isSameMessageDay(a: string, b: string): boolean {
  return dayjs(a).isSame(dayjs(b), "day");
}
