import dayjs from "dayjs";

export function localDateTimeToInstant(localDateTime: string): string {
  return dayjs(localDateTime).toISOString();
}

export function instantToLocalDateTimeInput(instant: string): string {
  return dayjs(instant).format("YYYY-MM-DDTHH:mm");
}
