import { Box } from "@mui/material";
import type { DayOfWeek, Schedule } from "../types/schedule.types";
import { getDayConfig } from "../utils/daysOfWeek";
import { groupSchedulesByDay } from "../utils/groupSchedulesByDay";
import { ScheduleDayCard } from "./ScheduleDayCard";

interface WeeklyScheduleProps {
  schedules: Schedule[];
  onAddBlock: (dayOfWeek: DayOfWeek) => void;
  onEditBlock: (schedule: Schedule) => void;
  onDeleteBlock: (schedule: Schedule) => void;
}

export function WeeklySchedule({
  schedules,
  onAddBlock,
  onEditBlock,
  onDeleteBlock,
}: WeeklyScheduleProps) {
  const scheduleDays = groupSchedulesByDay(schedules);

  return (
    <Box
      component="section"
      aria-label="Horario semanal"
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" },
        alignItems: "stretch",
      }}
    >
      {scheduleDays.map((scheduleDay) => (
        <ScheduleDayCard
          key={scheduleDay.day}
          dayConfig={getDayConfig(scheduleDay.day)}
          schedules={scheduleDay.schedules}
          onAddBlock={() => onAddBlock(scheduleDay.day)}
          onEditBlock={onEditBlock}
          onDeleteBlock={onDeleteBlock}
        />
      ))}
    </Box>
  );
}
