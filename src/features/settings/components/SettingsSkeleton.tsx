import { Box, Paper, Skeleton, Stack } from "@mui/material";

export function SettingsSkeleton() {
  return (
    <Stack spacing={3} aria-hidden="true">
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Skeleton variant="text" width={220} height={32} />
        <Skeleton variant="text" width={320} sx={{ mb: 2 }} />
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={56} />
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
            <Skeleton variant="rounded" height={56} />
            <Skeleton variant="rounded" height={56} />
          </Box>
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={56} />
          <Skeleton variant="rounded" height={64} />
        </Stack>
      </Paper>
      <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Skeleton variant="text" width={150} height={32} />
          <Skeleton variant="rounded" height={80} sx={{ mt: 2 }} />
        </Paper>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
          <Skeleton variant="text" width={150} height={32} />
          <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
        </Paper>
      </Box>
    </Stack>
  );
}
