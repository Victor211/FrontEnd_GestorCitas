import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormErrorAlert } from "../../../components/feedback/FormErrorAlert";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useUpdateBusinessSettings } from "../hooks/useUpdateBusinessSettings";
import {
  normalizeBusinessSettingsPayload,
  settingsSchema,
  toSettingsFormValues,
} from "../schemas/settings.schema";
import type { BusinessSettings, SettingsFormValues } from "../types/settings.types";

const TIMEZONE_OPTIONS = [
  "America/Asuncion",
  "America/Argentina/Buenos_Aires",
  "America/Sao_Paulo",
  "America/Santiago",
  "America/Lima",
  "America/Bogota",
  "America/Mexico_City",
  "America/New_York",
  "Europe/Madrid",
  "UTC",
];

interface BusinessSettingsFormProps {
  settings: BusinessSettings;
  onSuccess: (message: string) => void;
}

export function BusinessSettingsForm({ settings, onSuccess }: BusinessSettingsFormProps) {
  const updateMutation = useUpdateBusinessSettings();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: toSettingsFormValues(settings),
    resetOptions: { keepDirtyValues: true },
  });

  const timezoneValue = watch("timezone");
  const disabled = updateMutation.isPending;

  const onSubmit = (values: SettingsFormValues) => {
    const payload = normalizeBusinessSettingsPayload(values);

    updateMutation.mutate(payload, {
      onSuccess: (data) => {
        reset(toSettingsFormValues(data));
        onSuccess("Configuración actualizada correctamente.");
      },
    });
  };

  return (
    <Stack component="form" noValidate spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
      <FormErrorAlert
        message={updateMutation.isError ? getApiErrorMessage(updateMutation.error) : null}
      />

      <TextField
        {...register("name")}
        label="Nombre del negocio"
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={disabled}
        fullWidth
        required
      />

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        <TextField
          {...register("phone")}
          label="Teléfono"
          placeholder="+595981123456"
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

      <TextField
        {...register("address")}
        label="Dirección"
        error={!!errors.address}
        helperText={errors.address?.message ?? "Opcional"}
        disabled={disabled}
        fullWidth
      />

      <Autocomplete
        freeSolo
        options={TIMEZONE_OPTIONS}
        value={timezoneValue}
        disabled={disabled}
        onInputChange={(_event, newValue) =>
          setValue("timezone", newValue, { shouldValidate: true, shouldDirty: true })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Zona horaria"
            error={!!errors.timezone}
            helperText={
              errors.timezone?.message ??
              "Utilizá una zona horaria IANA, por ejemplo America/Asuncion."
            }
            required
          />
        )}
      />

      <Alert severity="info" sx={{ borderRadius: 2 }}>
        Cambiar la zona horaria afecta cómo el sistema interpreta fechas y horas futuras. Las
        citas existentes permanecen almacenadas en UTC.
      </Alert>

      <Stack direction="row" sx={{ justifyContent: { xs: "stretch", sm: "flex-end" } }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!isDirty || disabled}
          startIcon={disabled ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {disabled ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Stack>
    </Stack>
  );
}
