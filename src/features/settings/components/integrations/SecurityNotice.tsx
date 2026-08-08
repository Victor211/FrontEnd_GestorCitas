import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Tooltip, Typography } from "@mui/material";

const SECURITY_POINTS = [
  "Los tokens y secretos se almacenan únicamente en el servidor.",
  "El frontend nunca recibe las credenciales de Meta.",
  "La clave de OpenAI tampoco se expone al navegador.",
];

export function SecurityNotice() {
  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
        <LockOutlinedIcon color="action" fontSize="small" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Seguridad
        </Typography>
      </Stack>
      <List dense disablePadding>
        {SECURITY_POINTS.map((point) => (
          <ListItem key={point} disableGutters>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <ShieldOutlinedIcon fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemText primary={point} />
          </ListItem>
        ))}
      </List>
      <Tooltip
        title="Mantener los secretos únicamente en el servidor evita que credenciales sensibles queden expuestas en el navegador, en el código del frontend o en el tráfico de red visible para el usuario."
        arrow
      >
        <Typography
          variant="caption"
          color="primary"
          sx={{ cursor: "help", textDecoration: "underline dotted", display: "inline-block", mt: 0.5 }}
        >
          ¿Por qué?
        </Typography>
      </Tooltip>
    </Paper>
  );
}
