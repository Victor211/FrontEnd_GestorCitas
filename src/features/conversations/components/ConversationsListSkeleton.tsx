import { Box, Skeleton, Stack } from "@mui/material";

export function ConversationsListSkeleton() {
  return (
    <Stack spacing={0} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index} sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width={32} />
          </Stack>
          <Skeleton variant="text" width="70%" />
        </Box>
      ))}
    </Stack>
  );
}
