import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { PasswordField } from "../../../components/forms/PasswordField";
import { ROUTES } from "../../../routes/paths";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { AuthCard } from "../components/AuthCard";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

export function LoginPage() {
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const isBusy = isSubmitting || loginMutation.isPending;

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <AuthLayout
      title="Iniciar sesión"
      subtitle="Ingresá tus credenciales para acceder a tu negocio."
    >
      <AuthCard>
        <Stack component="form" onSubmit={onSubmit} noValidate spacing={2}>
          <FormErrorAlert
            message={
              loginMutation.isError
                ? getApiErrorMessage(loginMutation.error)
                : null
            }
          />
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
          <PasswordField
            {...register("password")}
            label="Contraseña"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" size="large" disabled={isBusy}>
            {isBusy ? "Ingresando..." : "Ingresar"}
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            ¿No tenés una cuenta?{" "}
            <MuiLink component={RouterLink} to={ROUTES.REGISTER}>
              Registrate
            </MuiLink>
          </Typography>
        </Stack>
      </AuthCard>
    </AuthLayout>
  );
}
