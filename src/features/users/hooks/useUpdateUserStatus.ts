import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../api/usersApi";
import { usersKeys } from "../api/usersKeys";

interface UpdateUserStatusVariables {
  id: number;
  active: boolean;
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: UpdateUserStatusVariables) =>
      updateUserStatus(id, { active }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
