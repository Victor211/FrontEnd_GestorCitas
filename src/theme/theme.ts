import { createTheme, type PaletteMode, type Theme } from "@mui/material";

export function createAppTheme(mode: PaletteMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#9c27b0",
      },
    },
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(25,118,210,0.24)"
                  : "rgba(25,118,210,0.12)",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(25,118,210,0.32)"
                    : "rgba(25,118,210,0.18)",
              },
            },
          },
        },
      },
    },
  });
}
