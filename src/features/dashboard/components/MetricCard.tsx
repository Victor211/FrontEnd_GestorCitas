import type { SvgIconComponent } from "@mui/icons-material";
import { alpha, Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface MetricCardProps {
  icon: SvgIconComponent;
  title: string;
  value: number;
  actionLabel: string;
  to: string;
}

export function MetricCard({
  icon: Icon,
  title,
  value,
  actionLabel,
  to,
}: MetricCardProps) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardActionArea component={RouterLink} to={to} sx={{ height: "100%", p: 2.5 }}>
        <Stack spacing={1}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon color="primary" aria-hidden="true" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
            {actionLabel}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
