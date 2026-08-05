import { zodResolver } from "@hookform/resolvers/zod";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { scheduleSchema } from "../schemas/schedule.schema";
import type { ScheduleFormValues } from "../types/schedule.types";
import { DAYS_OF_WEEK } from "../utils/daysOfWeek";

interface ScheduleFormProps {
  formId: string;
  defaultValues: ScheduleFormValues;
  onSubmit: (values: ScheduleFormValues) => void;
  disabled?: boolean;
}

export function ScheduleForm({
  formId,
  defaultValues,
  onSubmit,
  disabled = false,
}: ScheduleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues,
  });

  return (
    <Stack
      component="form"
      id={formId}
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("dayOfWeek")}
        select
        label="Día"
        defaultValue={defaultValues.dayOfWeek}
        error={!!errors.dayOfWeek}
        helperText={errors.dayOfWeek?.message}
        disabled={disabled}
        fullWidth
        required
      >
        {DAYS_OF_WEEK.map((day) => (
          <MenuItem key={day.value} value={day.value}>
            {day.fullLabel}
          </MenuItem>
        ))}
      </TextField>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          {...register("startTime")}
          type="time"
          label="Hora de inicio"
          error={!!errors.startTime}
          helperText={errors.startTime?.message}
          disabled={disabled}
          fullWidth
          required
          autoFocus
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          {...register("endTime")}
          type="time"
          label="Hora de fin"
          error={!!errors.endTime}
          helperText={errors.endTime?.message}
          disabled={disabled}
          fullWidth
          required
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Stack>
    </Stack>
  );
}
