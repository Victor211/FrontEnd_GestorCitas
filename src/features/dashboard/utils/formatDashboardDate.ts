import dayjs from "dayjs";
import "dayjs/locale/es";

export function formatAppointmentDate(isoDate: string): string {
  return dayjs(isoDate).locale("es").format("ddd, D MMM");
}

export function formatAppointmentTimeRange(startAt: string, endAt: string): string {
  return `${dayjs(startAt).format("HH:mm")} - ${dayjs(endAt).format("HH:mm")}`;
}
