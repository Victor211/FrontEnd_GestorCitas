import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { AuthProvider } from "../../features/auth/components/AuthProvider";
import { createAppTheme } from "../../theme/theme";
import { AppRouter } from "../router/AppRouter";
import { AppQueryProvider } from "./AppQueryProvider";

export function AppProviders() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () => createAppTheme(prefersDarkMode ? "dark" : "light"),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppQueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AppQueryProvider>
    </ThemeProvider>
  );
}
