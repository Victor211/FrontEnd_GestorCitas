import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../api/employeesApi";
import { employeesKeys } from "../api/employeesKeys";

interface UseEmployeeOptions {
  enabled?: boolean;
}

export function useEmployee(id: number, options: UseEmployeeOptions = {}) {
  return useQuery({
    queryKey: employeesKeys.detail(id),
    queryFn: () => getEmployeeById(id),
    enabled: options.enabled ?? true,
  });
}
