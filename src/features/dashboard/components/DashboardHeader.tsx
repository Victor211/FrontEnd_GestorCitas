import RefreshIcon from "@mui/icons-material/Refresh";
import { Box, CircularProgress, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { getGreeting } from "../utils/greeting";

interface DashboardHeaderProps {
  firstName: string;
  businessName: string;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DashboardHeader({
  firstName,
  businessName,
  onRefresh,
  isRefreshing,
}: DashboardHeaderProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      sx={{
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          {getGreeting()}, {firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {businessName}
        </Typography>
      </Box>
      <Tooltip title="Actualizar dashboard">
        <span>
          <IconButton
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Actualizar dashboard"
          >
            {isRefreshing ? <CircularProgress size={20} /> : <RefreshIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}
