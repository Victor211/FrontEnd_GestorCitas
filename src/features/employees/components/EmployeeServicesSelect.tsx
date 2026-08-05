import { Autocomplete, Box, CircularProgress, TextField, Typography } from "@mui/material";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { useServices } from "../../services/hooks/useServices";
import type { Service } from "../../services/types/service.types";
import { formatServiceDuration, formatServicePrice } from "../../services/utils/formatters";

const SERVICES_SELECTOR_PARAMS = { page: 0, size: 100 };

interface EmployeeServicesSelectProps {
  value: number[];
  onChange: (serviceIds: number[]) => void;
  error?: string;
  disabled?: boolean;
}

export function EmployeeServicesSelect({
  value,
  onChange,
  error,
  disabled = false,
}: EmployeeServicesSelectProps) {
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

  const activeServices = (servicesQuery.data?.content ?? []).filter(
    (service) => service.active,
  );
  const selectedServices = activeServices.filter((service) => value.includes(service.id));
  const isLoading = servicesQuery.isPending;

  return (
    <Autocomplete
      multiple
      options={activeServices}
      value={selectedServices}
      onChange={(_event, newValue: Service[]) =>
        onChange(newValue.map((service) => service.id))
      }
      getOptionLabel={(service) => service.name}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      loading={isLoading}
      disabled={disabled || isLoading}
      noOptionsText="No hay servicios activos disponibles."
      slotProps={{ chip: { size: "small" } }}
      renderOption={(props, service) => {
        const { key, ...optionProps } = props;
        return (
          <Box component="li" key={key} {...optionProps}>
            <Box
              aria-hidden="true"
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: service.color,
                mr: 1.5,
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
          label="Servicios"
          placeholder={selectedServices.length ? undefined : "Seleccioná uno o más servicios"}
          error={!!error}
          helperText={error ?? "Servicios que puede realizar este empleado."}
          required
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
