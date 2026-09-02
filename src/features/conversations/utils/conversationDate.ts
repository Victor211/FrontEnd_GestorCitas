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
