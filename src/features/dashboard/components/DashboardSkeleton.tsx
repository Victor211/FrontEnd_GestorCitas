import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

export function DashboardSkeleton() {
  return (
    <Stack spacing={3} aria-hidden="true">
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Skeleton variant="circular" width={24} height={24} sx={{ mb: 1.5 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="35%" height={44} />
              <Skeleton variant="text" width="45%" />
            </CardContent>
          </Card>
        ))}
      </Box>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Skeleton variant="text" width={160} height={32} sx={{ mb: 2 }} />
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={56} sx={{ mb: 1 }} />
          ))}
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Skeleton variant="text" width={160} height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={40} />
        </CardContent>
      </Card>
    </Stack>
  );
}
