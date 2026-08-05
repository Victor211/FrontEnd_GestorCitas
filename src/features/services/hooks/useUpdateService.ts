import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { updateService } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";
import type { UpdateServiceRequest } from "../types/service.types";

interface UpdateServiceVariables {
  id: number;
  request: UpdateServiceRequest;
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: UpdateServiceVariables) =>
      updateService(id, request),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: servicesKeys.detail(variables.id),
      });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
