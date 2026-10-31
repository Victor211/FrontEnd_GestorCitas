import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import type { Service } from "../types/service.types";
import { formatServiceDuration, formatServicePrice } from "../utils/formatters";

interface ServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDeactivate: (service: Service) => void;
  onActivate: (service: Service) => void;
  onPermanentDelete?: (service: Service) => void;
}

export function ServiceCard({ service, onEdit, onDeactivate, onActivate, onPermanentDelete }: ServiceCardProps) {
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
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "flex-end", flexWrap: "wrap", mt: 1.5 }}
        >
          {service.active ? (
            <>
              <IconButton aria-label={`Editar ${service.name}`} onClick={() => onEdit(service)} size="small">
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`Desactivar ${service.name}`}
                onClick={() => onDeactivate(service)}
                size="small"
              >
                <BlockOutlinedIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <Button
              size="small"
              color="success"
              startIcon={<CheckCircleOutlineIcon fontSize="small" />}
              aria-label={`Activar ${service.name}`}
              onClick={() => onActivate(service)}
            >
              Activar
            </Button>
          )}
          {onPermanentDelete && !service.active && (
            <Button
              size="small"
              color="error"
              startIcon={<DeleteForeverOutlinedIcon fontSize="small" />}
              aria-label={`Eliminar definitivamente ${service.name}`}
              onClick={() => onPermanentDelete(service)}
            >
              Eliminar definitivamente
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
