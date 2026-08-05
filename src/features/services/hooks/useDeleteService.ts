import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { deleteService } from "../api/servicesApi";
import { servicesKeys } from "../api/servicesKeys";

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: servicesKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
