import { Box, Card, CardContent, Paper, Skeleton, Stack } from "@mui/material";
import { LoadingTable } from "../../../components/feedback/LoadingTable";

const TABLE_COLUMNS = 6;

export function EmployeesSkeleton() {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }} aria-hidden="true">
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <LoadingTable columns={TABLE_COLUMNS} rows={5} />
      </Box>
      <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" }, p: 2 }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="30%" />
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
}
