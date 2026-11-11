import { Paper } from "@mui/material";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: 4,
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      }}
    >
      {children}
    </Paper>
  );
}
