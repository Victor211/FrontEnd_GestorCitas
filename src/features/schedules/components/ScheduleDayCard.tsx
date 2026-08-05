import AddIcon from "@mui/icons-material/Add";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import type { Schedule } from "../types/schedule.types";
import type { DayOfWeekConfig } from "../utils/daysOfWeek";
import { ScheduleBlock } from "./ScheduleBlock";

interface ScheduleDayCardProps {
  dayConfig: DayOfWeekConfig;
  schedules: Schedule[];
  onAddBlock: () => void;
  onEditBlock: (schedule: Schedule) => void;
  onDeleteBlock: (schedule: Schedule) => void;
}

export function ScheduleDayCard({
  dayConfig,
  schedules,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
}: ScheduleDayCardProps) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.5, height: "100%" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {dayConfig.fullLabel}
        </Typography>
        {schedules.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Sin horarios
          </Typography>
        ) : (
          <Stack component="ul" spacing={1} sx={{ p: 0, m: 0 }}>
            {schedules.map((schedule) => (
              <ScheduleBlock
                key={schedule.id}
                schedule={schedule}
                onEdit={onEditBlock}
                onDelete={onDeleteBlock}
              />
            ))}
          </Stack>
        )}
        <Button
          size="small"
          startIcon={<AddIcon fontSize="small" />}
          onClick={onAddBlock}
          sx={{ alignSelf: "flex-start", mt: "auto" }}
        >
          Agregar bloque
        </Button>
      </CardContent>
    </Card>
  );
}
