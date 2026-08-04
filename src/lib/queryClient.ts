import { QueryClient } from "@tanstack/react-query";

const NO_RETRY_STATUS_CODES = new Set([401, 403, 404]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const status = (error as { status?: number }).status;

        if (status !== undefined && NO_RETRY_STATUS_CODES.has(status)) {
          return false;
        }

        return failureCount < 2;
      },
    },
  },
});
