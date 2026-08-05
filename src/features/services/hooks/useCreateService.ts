import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { createService } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
