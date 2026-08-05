import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "../api/schedulesApi";
import { schedulesKeys } from "../api/schedulesKeys";

export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSchedule,
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: schedulesKeys.byEmployee(variables.employeeId),
      });
      void queryClient.invalidateQueries({ queryKey: schedulesKeys.lists() });
    },
  });
}
