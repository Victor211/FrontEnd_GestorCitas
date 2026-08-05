import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { HEX_COLOR_REGEX } from "../../services/schemas/service.schema";
import {
  employeeSchema,
  type EmployeeFormValues,
} from "../schemas/employee.schema";
import { EmployeeServicesSelect } from "./EmployeeServicesSelect";

interface EmployeeFormProps {
  formId: string;
  defaultValues: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => void;
  disabled?: boolean;
}

export function EmployeeForm({
  formId,
  defaultValues,
  onSubmit,
  disabled = false,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const colorValue = watch("color");
  const serviceIdsValue = watch("serviceIds");
  const previewColor = HEX_COLOR_REGEX.test(colorValue) ? colorValue : "#9e9e9e";

  return (
    <Stack
      component="form"
      id={formId}
      noValidate
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          {...register("firstName")}
          label="Nombre"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          disabled={disabled}
          fullWidth
          required
          autoFocus
        />
        <TextField
          {...register("lastName")}
          label="Apellido"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          disabled={disabled}
          fullWidth
          required
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          {...register("phone")}
          label="Teléfono"
          placeholder="+595981111111"
          error={!!errors.phone}
          helperText={errors.phone?.message ?? "Opcional"}
          disabled={disabled}
          fullWidth
        />
        <TextField
          {...register("email")}
          label="Correo electrónico"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message ?? "Opcional"}
          disabled={disabled}
          fullWidth
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
          aria-label="Elegir color del empleado"
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
      <EmployeeServicesSelect
        value={serviceIdsValue}
        onChange={(serviceIds) =>
          setValue("serviceIds", serviceIds, { shouldValidate: true, shouldDirty: true })
        }
        error={errors.serviceIds?.message}
        disabled={disabled}
      />
    </Stack>
  );
}
