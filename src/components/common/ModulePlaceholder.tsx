import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { Paper, Typography } from "@mui/material";

interface ModulePlaceholderProps {
  message?: string;
}

export function ModulePlaceholder({
  message = "Este módulo está en preparación.",
}: ModulePlaceholderProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 4, md: 6 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1.5,
        borderRadius: 3,
        borderStyle: "dashed",
      }}
    >
      <ConstructionOutlinedIcon sx={{ fontSize: 40, color: "text.secondary" }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Paper>
  );
}
