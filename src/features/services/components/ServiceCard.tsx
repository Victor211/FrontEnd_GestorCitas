import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import type { Service } from "../types/service.types";
import { formatServiceDuration, formatServicePrice } from "../utils/formatters";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <Card component="li" variant="outlined" sx={{ borderRadius: 2, listStyle: "none" }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <Box
            aria-hidden="true"
            sx={{
              width: 16,
              height: 16,
              mt: 0.5,
              borderRadius: "50%",
              backgroundColor: service.color,
              border: "1px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {service.name}
              </Typography>
              <Chip
                label={service.active ? "Activo" : "Inactivo"}
                color={service.active ? "success" : "default"}
                size="small"
                variant="outlined"
              />
            </Stack>
            {service.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {service.description}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mt: 1 }}>
              {formatServiceDuration(service.durationMinutes)} · {formatServicePrice(service.price)}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", mt: 1.5 }}>
          <IconButton aria-label={`Editar ${service.name}`} onClick={() => onEdit(service)} size="small">
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label={`Eliminar ${service.name}`} onClick={() => onDelete(service)} size="small">
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
