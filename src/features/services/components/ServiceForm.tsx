import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  HEX_COLOR_REGEX,
  serviceSchema,
  type ServiceFormValues,
} from "../schemas/service.schema";

interface ServiceFormProps {
  formId: string;
  defaultValues: ServiceFormValues;
  onSubmit: (values: ServiceFormValues) => void;
  disabled?: boolean;
}

export function ServiceForm({
  formId,
  defaultValues,
  onSubmit,
  disabled = false,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  const colorValue = watch("color");
  const previewColor = HEX_COLOR_REGEX.test(colorValue) ? colorValue : "#9e9e9e";

  return (
    <Stack
      component="form"
      id={formId}
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("name")}
        label="Nombre"
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={disabled}
        fullWidth
        required
        autoFocus
      />
      <TextField
        {...register("description")}
        label="Descripción"
        multiline
        minRows={2}
        maxRows={4}
        error={!!errors.description}
        helperText={errors.description?.message}
        disabled={disabled}
        fullWidth
      />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          {...register("durationMinutes", { valueAsNumber: true })}
          label="Duración (minutos)"
          type="number"
          slotProps={{ htmlInput: { min: 1, max: 480, step: 5 } }}
          error={!!errors.durationMinutes}
          helperText={errors.durationMinutes?.message}
          disabled={disabled}
          fullWidth
          required
        />
        <TextField
          {...register("price", { valueAsNumber: true })}
          label="Precio (₲)"
          type="number"
          slotProps={{ htmlInput: { min: 0, step: 100 } }}
          error={!!errors.price}
          helperText={errors.price?.message}
          disabled={disabled}
          fullWidth
          required
        />
      </Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
        <TextField
          {...register("color")}
          label="Color"
          placeholder="#2196F3"
          error={!!errors.color}
          helperText={errors.color?.message ?? "Formato hexadecimal, por ejemplo #2196F3."}
          disabled={disabled}
          sx={{ flexGrow: 1 }}
          required
        />
        <Box
          component="input"
          type="color"
          aria-label="Elegir color del servicio"
          value={previewColor}
          disabled={disabled}
          onChange={(event) =>
            setValue("color", event.target.value.toUpperCase(), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          sx={{
            width: 44,
            height: 44,
            mt: "8px",
            p: 0,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            cursor: disabled ? "default" : "pointer",
            backgroundColor: "transparent",
          }}
        />
      </Stack>
    </Stack>
  );
}
