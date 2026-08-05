import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  customerSchema,
  type CustomerFormValues,
} from "../schemas/customer.schema";

interface CustomerFormProps {
  formId: string;
  defaultValues: CustomerFormValues;
  onSubmit: (values: CustomerFormValues) => void;
  disabled?: boolean;
}

export function CustomerForm({
  formId,
  defaultValues,
  onSubmit,
  disabled = false,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
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
          helperText={errors.phone?.message}
          disabled={disabled}
          fullWidth
          required
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
