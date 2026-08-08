import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "../../auth/api/authKeys";
import { dashboardKeys } from "../../dashboard/api/dashboardKeys";
import { updateBusinessSettings } from "../api/settingsApi";
import { settingsKeys } from "../api/settingsKeys";

export function useUpdateBusinessSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBusinessSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(settingsKeys.business, data);
      void queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
      void queryClient.invalidateQueries({ queryKey: dashboardKeys.summary });
    },
  });
}
