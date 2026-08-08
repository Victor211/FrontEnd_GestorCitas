import { Autocomplete, Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { ROUTES } from "../../../routes/paths";
import { useCustomers } from "../../customers/hooks/useCustomers";

const CUSTOMERS_SELECTOR_PARAMS = { page: 0, size: 100 };

interface CustomerSelectProps {
  value: number;
  onChange: (customerId: number) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function CustomerSelect({
  value,
  onChange,
  error,
  disabled = false,
  required = true,
}: CustomerSelectProps) {
  const navigate = useNavigate();
  const customersQuery = useCustomers(CUSTOMERS_SELECTOR_PARAMS);

  if (customersQuery.isError) {
    return (
      <ErrorAlert
        title="No se pudieron cargar los clientes"
        error={customersQuery.error}
        onRetry={() => void customersQuery.refetch()}
        isRetrying={customersQuery.isFetching}
      />
    );
  }

  if (customersQuery.isSuccess && customersQuery.data.content.length === 0) {
    return (
      <EmptyState
        title="No hay clientes registrados"
        actionLabel="Ir a clientes"
        onAction={() => navigate(ROUTES.CUSTOMERS)}
      />
    );
  }

  const customers = customersQuery.data?.content ?? [];
  const isLoading = customersQuery.isPending;
  const selected = customers.find((customer) => customer.id === value) ?? null;

  return (
    <Autocomplete
      options={customers}
      value={selected}
      onChange={(_event, newValue) => onChange(newValue?.id ?? 0)}
      getOptionLabel={(customer) => `${customer.firstName} ${customer.lastName}`}
      isOptionEqualToValue={(option, selectedOpt) => option.id === selectedOpt.id}
      loading={isLoading}
      disabled={disabled || isLoading}
      noOptionsText="Sin resultados."
      renderOption={(props, customer) => {
        const { key, ...optionProps } = props;
        return (
          <Box component="li" key={key} {...optionProps}>
            <Box>
              <Typography variant="body2">{`${customer.firstName} ${customer.lastName}`}</Typography>
              <Typography variant="caption" color="text.secondary">
                {customer.phone}
                {customer.email ? ` · ${customer.email}` : ""}
              </Typography>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cliente"
          placeholder="Seleccioná un cliente"
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
