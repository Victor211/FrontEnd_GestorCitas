import { useQuery } from "@tanstack/react-query";
import { authKeys } from "../api/authKeys";
import { getCurrentUser } from "../api/authApi";

interface UseCurrentUserOptions {
  enabled: boolean;
}

export function useCurrentUser({ enabled }: UseCurrentUserOptions) {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    enabled,
  });
}
