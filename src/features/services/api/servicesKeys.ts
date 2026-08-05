import type { ServicesListParams } from "../types/service.types";

export const servicesKeys = {
  all: ["services"] as const,
  lists: () => [...servicesKeys.all, "list"] as const,
  list: (filters: ServicesListParams) => [...servicesKeys.lists(), filters] as const,
  details: () => [...servicesKeys.all, "detail"] as const,
  detail: (id: number) => [...servicesKeys.details(), id] as const,
};
