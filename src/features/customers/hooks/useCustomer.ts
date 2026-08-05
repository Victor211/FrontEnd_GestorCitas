import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";

interface UseCustomerOptions {
  enabled?: boolean;
}

export function useCustomer(id: number, options: UseCustomerOptions = {}) {
  return useQuery({
    queryKey: customersKeys.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: options.enabled ?? true,
  });
}
