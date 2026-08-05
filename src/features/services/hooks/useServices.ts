import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getServices } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";
import type { ServicesListParams } from "../types/service.types";

export function useServices(filters: ServicesListParams) {
  return useQuery({
    queryKey: servicesKeys.list(filters),
    queryFn: () => getServices(filters),
    placeholderData: keepPreviousData,
  });
}
