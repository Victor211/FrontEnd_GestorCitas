import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import type { Service } from "../types/service.types";
import { formatServiceDuration, formatServicePrice } from "../utils/formatters";

interface ServicesTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDeactivate: (service: Service) => void;
  onActivate: (service: Service) => void;
}

export function ServicesTable({ services, onEdit, onDeactivate, onActivate }: ServicesTableProps) {
  return (
    <TableContainer sx={{ display: { xs: "none", md: "block" } }}>
      <Table aria-label="Servicios">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 48 }}>Color</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Duración</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id} hover>
              <TableCell>
                <Box
                  aria-hidden="true"
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: service.color,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              </TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell sx={{ maxWidth: 260 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  title={service.description ?? undefined}
                >
                  {service.description || "—"}
                </Typography>
              </TableCell>
              <TableCell>{formatServiceDuration(service.durationMinutes)}</TableCell>
              <TableCell>{formatServicePrice(service.price)}</TableCell>
              <TableCell>
                <Chip
                  label={service.active ? "Activo" : "Inactivo"}
                  color={service.active ? "success" : "default"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                {service.active ? (
                    <>
                      <Tooltip title="Editar servicio">
                        <IconButton
                          aria-label={`Editar ${service.name}`}
                          onClick={() => onEdit(service)}
                          size="small"
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar servicio">
                        <IconButton
                          aria-label={`Desactivar ${service.name}`}
                          onClick={() => onDeactivate(service)}
                          size="small"
                        >
                          <BlockOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Activar servicio">
                      <IconButton
                        aria-label={`Activar ${service.name}`}
                        onClick={() => onActivate(service)}
                        size="small"
                        color="success"
                      >
                        <CheckCircleOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
