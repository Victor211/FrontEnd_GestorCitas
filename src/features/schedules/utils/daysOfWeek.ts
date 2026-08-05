import type { DayOfWeek } from "../types/schedule.types";

export interface DayOfWeekConfig {
  value: DayOfWeek;
  shortLabel: string;
  fullLabel: string;
  order: number;
}

export const DAYS_OF_WEEK: DayOfWeekConfig[] = [
  { value: "MONDAY", shortLabel: "Lun", fullLabel: "Lunes", order: 1 },
  { value: "TUESDAY", shortLabel: "Mar", fullLabel: "Martes", order: 2 },
  { value: "WEDNESDAY", shortLabel: "Mié", fullLabel: "Miércoles", order: 3 },
  { value: "THURSDAY", shortLabel: "Jue", fullLabel: "Jueves", order: 4 },
  { value: "FRIDAY", shortLabel: "Vie", fullLabel: "Viernes", order: 5 },
  { value: "SATURDAY", shortLabel: "Sáb", fullLabel: "Sábado", order: 6 },
  { value: "SUNDAY", shortLabel: "Dom", fullLabel: "Domingo", order: 7 },
];

export function getDayConfig(day: DayOfWeek): DayOfWeekConfig {
  const config = DAYS_OF_WEEK.find((entry) => entry.value === day);

  if (!config) {
    throw new Error(`Día no reconocido: ${day}`);
  }

  return config;
}
