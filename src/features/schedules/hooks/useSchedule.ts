import { useQuery } from "@tanstack/react-query";
import { getScheduleById } from "../api/schedulesApi";
import { schedulesKeys } from "../api/schedulesKeys";

interface UseScheduleOptions {
  enabled?: boolean;
}

export function useSchedule(id: number, options: UseScheduleOptions = {}) {
  return useQuery({
    queryKey: schedulesKeys.detail(id),
    queryFn: () => getScheduleById(id),
    enabled: options.enabled ?? true,
  });
}
