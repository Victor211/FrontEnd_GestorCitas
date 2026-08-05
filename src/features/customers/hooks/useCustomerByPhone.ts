import { useQuery } from "@tanstack/react-query";
import { getCustomerByPhone } from "../api/customersApi";
import { customersKeys } from "../api/customersKeys";

interface UseCustomerByPhoneOptions {
  enabled?: boolean;
}

export function useCustomerByPhone(
  phone: string,
  options: UseCustomerByPhoneOptions = {},
) {
  return useQuery({
    queryKey: customersKeys.byPhone(phone),
    queryFn: () => getCustomerByPhone(phone),
    enabled: (options.enabled ?? true) && phone !== "",
  });
}
