import type { ScheduleFilters } from "../types/schedule.types";

export const schedulesKeys = {
  all: ["schedules"] as const,
  lists: () => [...schedulesKeys.all, "list"] as const,
  list: (filters: ScheduleFilters) => [...schedulesKeys.lists(), filters] as const,
  details: () => [...schedulesKeys.all, "detail"] as const,
  detail: (id: number) => [...schedulesKeys.details(), id] as const,
  byEmployeeRoot: () => [...schedulesKeys.all, "byEmployee"] as const,
  byEmployee: (employeeId: number) => [...schedulesKeys.byEmployeeRoot(), employeeId] as const,
};
