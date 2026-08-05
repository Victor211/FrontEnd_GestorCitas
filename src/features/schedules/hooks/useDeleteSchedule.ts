import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchedule } from "../api/schedulesApi";
import { schedulesKeys } from "../api/schedulesKeys";

interface DeleteScheduleVariables {
  id: number;
  employeeId: number;
}

export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteScheduleVariables) => deleteSchedule(id),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: schedulesKeys.byEmployee(variables.employeeId),
      });
      void queryClient.invalidateQueries({ queryKey: schedulesKeys.lists() });
    },
  });
}
