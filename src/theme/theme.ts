import { alpha, createTheme, type PaletteMode, type Theme } from "@mui/material";

const PRIMARY_MAIN = "#1976d2";

// Tokens de superficie y texto por modo. Se centralizan acá para que todas las pantallas compartan
// el mismo fondo, bordes y grises sin hardcodear colores en los componentes.
const surfaces = {
  light: {
    background: "#F4F6F9",
    paper: "#FFFFFF",
    subtle: "#F8FAFC",
    divider: "#E3E8EF",
    inputBorder: "#D5DCE5",
    textPrimary: "#1A2027",
    textSecondary: "#5B6573",
  },
  dark: {
    background: "#0F1419",
    paper: "#161B22",
    subtle: "#1C232C",
    divider: "#2A323D",
    inputBorder: "#36404D",
    textPrimary: "#E6EAF0",
    textSecondary: "#A3ADBA",
  },
} as const;

export function createAppTheme(mode: PaletteMode): Theme {
  const s = surfaces[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: PRIMARY_MAIN,
      },
      secondary: {
        main: "#9c27b0",
      },
      background: {
        default: s.background,
        paper: s.paper,
      },
      text: {
        primary: s.textPrimary,
        secondary: s.textSecondary,
      },
      divider: s.divider,
    },
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      h3: { fontWeight: 700, letterSpacing: "-0.02em" },
      h4: { fontWeight: 700, letterSpacing: "-0.015em" },
      h5: { fontWeight: 700, letterSpacing: "-0.01em" },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 8,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: s.background,
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 10,
          },
          outlined: {
            borderColor: s.inputBorder,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          outlined: {
            borderColor: s.divider,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            borderColor: s.divider,
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: s.subtle,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: s.inputBorder,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: s.divider,
          },
          head: {
            backgroundColor: s.subtle,
            color: s.textSecondary,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: 12,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            "&.Mui-selected": {
              backgroundColor: alpha(PRIMARY_MAIN, mode === "dark" ? 0.24 : 0.1),
              "&:hover": {
                backgroundColor: alpha(PRIMARY_MAIN, mode === "dark" ? 0.32 : 0.16),
              },
            },
          },
        },
      },
    },
  });
}
