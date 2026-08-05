import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import type { Schedule } from "../types/schedule.types";
import { calculateScheduleDuration, formatScheduleTime } from "../utils/scheduleTime";

interface ScheduleBlockProps {
  schedule: Schedule;
  onEdit: (schedule: Schedule) => void;
  onDelete: (schedule: Schedule) => void;
}

export function ScheduleBlock({ schedule, onEdit, onDelete }: ScheduleBlockProps) {
  const label = `${formatScheduleTime(schedule.startTime)} — ${formatScheduleTime(schedule.endTime)}`;

  return (
    <Stack
      component="li"
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        listStyle: "none",
        px: 1.5,
        py: 1,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {calculateScheduleDuration(schedule.startTime, schedule.endTime)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Editar horario">
          <IconButton
            aria-label={`Editar horario ${label}`}
            onClick={() => onEdit(schedule)}
            size="small"
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar horario">
          <IconButton
            aria-label={`Eliminar horario ${label}`}
            onClick={() => onDelete(schedule)}
            size="small"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
