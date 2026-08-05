import { Box, Card, CardContent, Skeleton } from "@mui/material";

export function SchedulesSkeleton() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
      }}
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <Card key={index} variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />
            <Skeleton variant="text" width="40%" sx={{ mt: 1.5 }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
