import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Link as MuiLink, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { AvnexLogo } from "../../../components/branding/AvnexLogo";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { PasswordField } from "../../../components/forms/PasswordField";
import { REGISTRATION_ENABLED, ROUTES } from "../../../routes/paths";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { AuthCard } from "../components/AuthCard";
import { useAuth } from "../hooks/useAuth";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { authFieldSx } from "../utils/authFieldStyles";
import { SESSION_NOTICE_MESSAGES } from "../utils/sessionNotices";

export function LoginPage() {
  const loginMutation = useLogin();
  const { sessionNotice, clearSessionNotice } = useAuth();
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
      title="Bienvenido de nuevo"
      subtitle="Ingresá tus credenciales para continuar."
      logo={
        <>
          {/* Móvil y tablet: logo vertical. Escritorio (panel azul visible): logo horizontal. */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <AvnexLogo variant="vertical" height={120} />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: -2.5 }}>
            <AvnexLogo variant="horizontal" height={100} />
          </Box>
        </>
      }
    >
      <AuthCard>
        <Stack component="form" onSubmit={onSubmit} noValidate spacing={2}>
          {sessionNotice && (
            <Alert severity="warning" role="alert" onClose={clearSessionNotice}>
              {SESSION_NOTICE_MESSAGES[sessionNotice]}
            </Alert>
          )}
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
            sx={authFieldSx}
          />
          <PasswordField
            {...register("password")}
            label="Contraseña"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            required
            sx={authFieldSx}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isBusy}
            sx={{
              minHeight: 48,
              borderRadius: 3,
              fontSize: "1rem",
              "&:hover": { boxShadow: "0 6px 16px rgba(25,118,210,0.35)" },
              "&:focus-visible": {
                outline: "3px solid",
                outlineColor: "primary.light",
                outlineOffset: 2,
              },
              "&.Mui-disabled": { opacity: 0.6 },
            }}
          >
            {isBusy ? "Ingresando..." : "Ingresar"}
          </Button>
          {REGISTRATION_ENABLED && (
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              ¿No tenés una cuenta?{" "}
              <MuiLink component={RouterLink} to={ROUTES.REGISTER}>
                Registrate
              </MuiLink>
            </Typography>
          )}
        </Stack>
      </AuthCard>
    </AuthLayout>
  );
}
