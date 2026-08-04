import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Link as MuiLink,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { PasswordField } from "../../../components/forms/PasswordField";
import { ROUTES } from "../../../routes/paths";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { AuthCard } from "../components/AuthCard";
import { useRegister } from "../hooks/useRegister";
import {
  registerDefaultValues,
  registerSchema,
  TIMEZONE_OPTIONS,
  toRegisterRequest,
  type RegisterFormValues,
} from "../schemas/register.schema";

export function RegisterPage() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const isBusy = isSubmitting || registerMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate(toRegisterRequest(values));
  });

  return (
    <AuthLayout
      title="Creá tu cuenta"
      subtitle="Registrá tu negocio y empezá a gestionar tus turnos."
    >
      <AuthCard>
        <Stack component="form" onSubmit={onSubmit} noValidate spacing={2}>
          <FormErrorAlert
            message={
              registerMutation.isError
                ? getApiErrorMessage(registerMutation.error)
                : null
            }
          />

          <Typography variant="subtitle2" color="text.secondary">
            Datos del propietario
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              {...register("ownerFirstName")}
              label="Nombre"
              autoComplete="given-name"
              error={!!errors.ownerFirstName}
              helperText={errors.ownerFirstName?.message}
              fullWidth
              required
            />
            <TextField
              {...register("ownerLastName")}
              label="Apellido"
              autoComplete="family-name"
              error={!!errors.ownerLastName}
              helperText={errors.ownerLastName?.message}
              fullWidth
              required
            />
          </Box>
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            required
          />
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <PasswordField
              {...register("password")}
              label="Contraseña"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              required
            />
            <PasswordField
              {...register("confirmPassword")}
              label="Confirmar contraseña"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              required
            />
          </Box>

          <Typography variant="subtitle2" color="text.secondary" sx={{ pt: 1 }}>
            Datos del negocio
          </Typography>
          <TextField
            {...register("businessName")}
            label="Nombre del negocio"
            autoComplete="organization"
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
            fullWidth
            required
          />
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              {...register("businessPhone")}
              label="Teléfono del negocio"
              autoComplete="tel"
              error={!!errors.businessPhone}
              helperText={errors.businessPhone?.message}
              fullWidth
              required
            />
            <TextField
              {...register("businessEmail")}
              label="Email del negocio"
              type="email"
              autoComplete="email"
              error={!!errors.businessEmail}
              helperText={errors.businessEmail?.message}
              fullWidth
            />
          </Box>
          <TextField
            {...register("businessAddress")}
            label="Dirección del negocio"
            autoComplete="street-address"
            error={!!errors.businessAddress}
            helperText={errors.businessAddress?.message}
            fullWidth
          />
          <TextField
            {...register("businessTimezone")}
            select
            label="Zona horaria"
            error={!!errors.businessTimezone}
            helperText={errors.businessTimezone?.message}
            fullWidth
            required
          >
            {TIMEZONE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" size="large" disabled={isBusy}>
            {isBusy ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            ¿Ya tenés una cuenta?{" "}
            <MuiLink component={RouterLink} to={ROUTES.LOGIN}>
              Iniciá sesión
            </MuiLink>
          </Typography>
        </Stack>
      </AuthCard>
    </AuthLayout>
  );
}
