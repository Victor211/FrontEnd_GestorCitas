import { Box, Skeleton, Stack } from "@mui/material";

export function ConversationsListSkeleton() {
  return (
    <Stack spacing={0} aria-hidden="true" sx={{ p: 0.75 }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Stack key={index} direction="row" spacing={1.5} sx={{ px: 1.25, py: 1.5 }}>
          <Skeleton variant="circular" width={44} height={44} sx={{ flexShrink: 0 }} />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Skeleton variant="text" width="45%" />
              <Skeleton variant="text" width={32} />
            </Stack>
            <Skeleton variant="text" width="75%" />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}
