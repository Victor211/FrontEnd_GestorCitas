import { useQuery } from "@tanstack/react-query";
import { getBusinessSettings } from "../api/settingsApi";
import { settingsKeys } from "../api/settingsKeys";

export function useBusinessSettings() {
  return useQuery({
    queryKey: settingsKeys.business,
    queryFn: getBusinessSettings,
    staleTime: 60_000,
  });
}
