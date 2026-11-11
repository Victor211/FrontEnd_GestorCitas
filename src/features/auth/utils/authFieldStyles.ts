import { alpha, type Theme } from "@mui/material";
import type { SxProps } from "@mui/material";

// Escala de la etiqueta flotante (MUI usa 0.75 por defecto, demasiado chica en el login).
// El <legend> del borde debe usar la misma escala para que la muesca calce con el texto.
const LABEL_SCALE = 0.875;

/**
 * Estilos de los campos de las pantallas de autenticación: etiqueta flotante más legible,
 * separada del borde, y fondo estable (incluido el autocompletado del navegador).
 */
export const authFieldSx: SxProps<Theme> = (theme) => {
  const isDark = theme.palette.mode === "dark";
  const fieldBg = isDark ? "#1C232C" : "#F8FAFC";
  const labelColor = isDark ? "#C3CBD6" : theme.palette.text.secondary;
  const focusColor = isDark
    ? theme.palette.primary.light
    : theme.palette.primary.main;

  return {
    "& .MuiInputLabel-root": {
      color: labelColor,
      fontSize: "1rem",
      fontWeight: 500,
      "&.Mui-focused": { color: focusColor },
      "&.Mui-error": { color: theme.palette.error.main },
      "& .MuiInputLabel-asterisk": { color: theme.palette.error.light },
    },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      transform: `translate(14px, -9px) scale(${LABEL_SCALE})`,
      maxWidth: `calc((100% - 28px) / ${LABEL_SCALE})`,
    },
    "& .MuiOutlinedInput-notchedOutline legend": {
      fontSize: `${LABEL_SCALE}em`,
    },
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      backgroundColor: fieldBg,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: isDark ? "#52606F" : "#9AA6B5",
      },
      "&.Mui-focused": {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
      "&.Mui-error.Mui-focused": {
        boxShadow: `0 0 0 3px ${alpha(theme.palette.error.main, 0.25)}`,
      },
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.primary,
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
        {
          WebkitBoxShadow: `0 0 0 100px ${fieldBg} inset`,
          WebkitTextFillColor: theme.palette.text.primary,
          caretColor: theme.palette.text.primary,
          borderRadius: "inherit",
          transition: "background-color 9999s ease-out 0s",
        },
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.8125rem",
      marginLeft: 1.75,
      marginRight: 1.75,
      "&.Mui-error": { color: theme.palette.error.light },
    },
  };
};
