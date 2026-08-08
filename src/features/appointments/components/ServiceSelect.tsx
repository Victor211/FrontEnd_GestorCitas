import { Autocomplete, Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { ROUTES } from "../../../routes/paths";
import { useServices } from "../../services/hooks/useServices";
import { formatServiceDuration, formatServicePrice } from "../../services/utils/formatters";

const SERVICES_SELECTOR_PARAMS = { page: 0, size: 100 };

interface ServiceSelectProps {
  value: number;
  onChange: (serviceId: number) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function ServiceSelect({
  value,
  onChange,
  error,
  disabled = false,
  required = true,
}: ServiceSelectProps) {
  const navigate = useNavigate();
  const servicesQuery = useServices(SERVICES_SELECTOR_PARAMS);

  if (servicesQuery.isError) {
    return (
      <ErrorAlert
        title="No se pudieron cargar los servicios"
        error={servicesQuery.error}
        onRetry={() => void servicesQuery.refetch()}
        isRetrying={servicesQuery.isFetching}
      />
    );
  }

  const activeServices = (servicesQuery.data?.content ?? []).filter((service) => service.active);
  const isLoading = servicesQuery.isPending;

  if (servicesQuery.isSuccess && activeServices.length === 0) {
    return (
      <EmptyState
        title="No hay servicios activos"
        actionLabel="Ir a servicios"
        onAction={() => navigate(ROUTES.SERVICES)}
      />
    );
  }

  const selected = activeServices.find((service) => service.id === value) ?? null;

  return (
    <Autocomplete
      options={activeServices}
      value={selected}
      onChange={(_event, newValue) => onChange(newValue?.id ?? 0)}
      getOptionLabel={(service) => service.name}
      isOptionEqualToValue={(option, selectedOpt) => option.id === selectedOpt.id}
      loading={isLoading}
      disabled={disabled || isLoading}
      noOptionsText="Sin resultados."
      renderOption={(props, service) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <Box
              aria-hidden="true"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: service.color,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography variant="body2">{service.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatServiceDuration(service.durationMinutes)} · {formatServicePrice(service.price)}
              </Typography>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Servicio"
          placeholder="Seleccioná un servicio"
          error={!!error}
          helperText={error}
          required={required}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={16} /> : null}
                  {params.slotProps.input.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
