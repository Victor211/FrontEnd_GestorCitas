import { zodResolver } from "@hookform/resolvers/zod";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { PasswordField } from "../../../components/forms/PasswordField";
import {
  ASSIGNABLE_ROLES,
  userFormDefaultValues,
  userSchema,
  type UserFormValues,
} from "../schemas/user.schema";
import { getRoleLabel } from "../utils/userDisplay";

interface UserFormProps {
  formId: string;
  onSubmit: (values: UserFormValues) => void;
  disabled?: boolean;
}

export function UserForm({ formId, onSubmit, disabled = false }: UserFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: userFormDefaultValues,
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
      <TextField
        {...register("email")}
        label="Correo electrónico"
        type="email"
        autoComplete="off"
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={disabled}
        fullWidth
        required
      />
      <PasswordField
        {...register("password")}
        label="Contraseña inicial"
        autoComplete="new-password"
        error={!!errors.password}
        helperText={
          errors.password?.message ?? "Mínimo 8 caracteres. Compartila de forma segura."
        }
        disabled={disabled}
        fullWidth
        required
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Rol"
            error={!!errors.role}
            helperText={errors.role?.message}
            disabled={disabled}
            fullWidth
            required
          >
            {ASSIGNABLE_ROLES.map((role) => (
              <MenuItem key={role} value={role}>
                {getRoleLabel(role)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Stack>
  );
}
