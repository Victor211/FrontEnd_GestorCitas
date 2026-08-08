import { Box, Paper, Skeleton, Stack } from "@mui/material";

export function CalendarSkeleton() {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }} aria-hidden="true">
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Skeleton variant="rounded" width={90} height={32} />
        <Skeleton variant="rounded" width={70} height={32} />
        <Skeleton variant="rounded" width={90} height={32} />
        <Skeleton variant="text" width={180} height={32} sx={{ ml: 2 }} />
      </Stack>
      <Box sx={{ display: "grid", gap: 1 }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={48} />
        ))}
      </Box>
    </Paper>
  );
}
