import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/usersApi";
import { usersKeys } from "../api/usersKeys";
import type { UserFilters } from "../types/user.types";

export function useUsers(filters: UserFilters) {
  return useQuery({
    queryKey: usersKeys.list(filters),
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
  });
}
