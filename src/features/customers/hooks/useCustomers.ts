import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";
import type { CustomerFilters } from "../types/customer.types";

export function useCustomers(filters: CustomerFilters) {
  return useQuery({
    queryKey: customersKeys.list(filters),
    queryFn: () => getCustomers(filters),
    placeholderData: keepPreviousData,
  });
}
