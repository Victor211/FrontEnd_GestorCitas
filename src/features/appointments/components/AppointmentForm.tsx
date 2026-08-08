import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { appointmentSchema } from "../schemas/appointment.schema";
import type { AppointmentFormValues } from "../types/appointment.types";
import { CustomerSelect } from "./CustomerSelect";
import { EmployeeSelect } from "./EmployeeSelect";
import { ServiceSelect } from "./ServiceSelect";

interface AppointmentFormProps {
  formId: string;
  defaultValues: AppointmentFormValues;
  onSubmit: (values: AppointmentFormValues) => void;
  disabled?: boolean;
}

export function AppointmentForm({
  formId,
  defaultValues,
  onSubmit,
  disabled = false,
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues,
  });

  const customerId = watch("customerId");
  const serviceId = watch("serviceId");
  const employeeId = watch("employeeId");

  useEffect(() => {
    setValue("employeeId", 0, { shouldValidate: false, shouldDirty: false });
  }, [serviceId, setValue]);

  return (
    <Stack
      component="form"
      id={formId}
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomerSelect
        value={customerId}
        onChange={(id) => setValue("customerId", id, { shouldValidate: true, shouldDirty: true })}
        error={errors.customerId?.message}
        disabled={disabled}
      />
      <ServiceSelect
        value={serviceId}
        onChange={(id) => setValue("serviceId", id, { shouldValidate: true, shouldDirty: true })}
        error={errors.serviceId?.message}
        disabled={disabled}
      />
      <EmployeeSelect
        value={employeeId}
        onChange={(id) => setValue("employeeId", id, { shouldValidate: true, shouldDirty: true })}
        serviceId={serviceId || null}
        error={errors.employeeId?.message}
        disabled={disabled}
      />
      <TextField
        {...register("startAt")}
        type="datetime-local"
        label="Fecha y hora"
        error={!!errors.startAt}
        helperText={errors.startAt?.message}
        disabled={disabled}
        fullWidth
        required
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        {...register("notes")}
        label="Notas"
        multiline
        minRows={3}
        maxRows={6}
        error={!!errors.notes}
        helperText={errors.notes?.message ?? "Opcional"}
        disabled={disabled}
        fullWidth
      />
    </Stack>
  );
}
