import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employeesApi";
import { employeesKeys } from "../api/employeesKeys";
import type { EmployeeFilters } from "../types/employee.types";

export function useEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: employeesKeys.list(filters),
    queryFn: () => getEmployees(filters),
    placeholderData: keepPreviousData,
  });
}
