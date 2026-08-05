import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule } from "../api/schedulesApi";
import { schedulesKeys } from "../api/schedulesKeys";
import type { UpdateScheduleRequest } from "../types/schedule.types";

interface UpdateScheduleVariables {
  id: number;
  request: UpdateScheduleRequest;
}

export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateScheduleVariables) => updateSchedule(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: schedulesKeys.byEmployee(variables.request.employeeId),
      });
      void queryClient.invalidateQueries({
        queryKey: schedulesKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: schedulesKeys.lists() });
    },
  });
}
