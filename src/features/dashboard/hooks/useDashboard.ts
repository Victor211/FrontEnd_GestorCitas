import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/dashboardApi";
import { dashboardKeys } from "../api/dashboardKeys";

export function useDashboard() {
  return useQuery({
    queryKey: dashboardKeys.summary,
    queryFn: getDashboard,
  });
}
