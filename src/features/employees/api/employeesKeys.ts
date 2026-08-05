import type { EmployeeFilters } from "../types/employee.types";

export const employeesKeys = {
  all: ["employees"] as const,
  lists: () => [...employeesKeys.all, "list"] as const,
  list: (filters: EmployeeFilters) => [...employeesKeys.lists(), filters] as const,
  details: () => [...employeesKeys.all, "detail"] as const,
  detail: (id: number) => [...employeesKeys.details(), id] as const,
};
