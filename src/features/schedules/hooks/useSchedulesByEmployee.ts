import { useQuery } from "@tanstack/react-query";
import { getSchedulesByEmployee } from "../api/schedulesApi";
import { schedulesKeys } from "../api/schedulesKeys";

interface UseSchedulesByEmployeeOptions {
  enabled?: boolean;
}

export function useSchedulesByEmployee(
  employeeId: number,
  options: UseSchedulesByEmployeeOptions = {},
) {
  return useQuery({
    queryKey: schedulesKeys.byEmployee(employeeId),
    queryFn: () => getSchedulesByEmployee(employeeId),
    enabled: options.enabled ?? true,
  });
}
