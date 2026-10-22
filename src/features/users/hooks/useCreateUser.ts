import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/usersApi";
import { usersKeys } from "../api/usersKeys";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
