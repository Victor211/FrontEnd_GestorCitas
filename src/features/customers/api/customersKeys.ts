import type { CustomerFilters } from "../types/customer.types";

export const customersKeys = {
  all: ["customers"] as const,
  lists: () => [...customersKeys.all, "list"] as const,
  list: (filters: CustomerFilters) => [...customersKeys.lists(), filters] as const,
  details: () => [...customersKeys.all, "detail"] as const,
  detail: (id: number) => [...customersKeys.details(), id] as const,
  byPhoneRoot: () => [...customersKeys.all, "byPhone"] as const,
  byPhone: (phone: string) => [...customersKeys.byPhoneRoot(), phone] as const,
};
