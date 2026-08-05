import { useQuery } from "@tanstack/react-query";
import { getServiceById } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";

interface UseServiceOptions {
  enabled?: boolean;
}

export function useService(id: number, options: UseServiceOptions = {}) {
  return useQuery({
    queryKey: servicesKeys.detail(id),
    queryFn: () => getServiceById(id),
    enabled: options.enabled ?? true,
  });
}
