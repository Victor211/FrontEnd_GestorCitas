import { Autocomplete, Avatar, Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../../components/common/EmptyState";
import { ErrorAlert } from "../../../components/feedback/ErrorAlert";
import { ROUTES } from "../../../routes/paths";
import { getInitials } from "../../../utils/getInitials";
import { useEmployees } from "../../employees/hooks/useEmployees";

const EMPLOYEES_SELECTOR_PARAMS = { page: 0, size: 100 };

interface EmployeeSelectProps {
  value: number;
  onChange: (employeeId: number) => void;
  serviceId?: number | null;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function EmployeeSelect({
  value,
  onChange,
  serviceId,
  error,
  disabled = false,
  required = true,
}: EmployeeSelectProps) {
  const navigate = useNavigate();
  const employeesQuery = useEmployees(EMPLOYEES_SELECTOR_PARAMS);

  if (employeesQuery.isError) {
    return (
      <ErrorAlert
        title="No se pudieron cargar los empleados"
        error={employeesQuery.error}
        onRetry={() => void employeesQuery.refetch()}
        isRetrying={employeesQuery.isFetching}
      />
    );
  }

  const activeEmployees = (employeesQuery.data?.content ?? []).filter(
    (employee) => employee.active,
  );

  if (employeesQuery.isSuccess && activeEmployees.length === 0) {
    return (
      <EmptyState
        title="No hay empleados disponibles"
        actionLabel="Ir a empleados"
        onAction={() => navigate(ROUTES.EMPLOYEES)}
      />
    );
  }

  const compatibleEmployees = serviceId
    ? activeEmployees.filter((employee) =>
        employee.services.some((service) => service.id === serviceId),
      )
    : activeEmployees;

  const isLoading = employeesQuery.isPending;

  if (serviceId && employeesQuery.isSuccess && compatibleEmployees.length === 0) {
    return (
      <EmptyState
        title="No hay empleados habilitados para este servicio"
        description="Asigná el servicio a un empleado desde el módulo de Empleados."
      />
    );
  }

  const selected = compatibleEmployees.find((employee) => employee.id === value) ?? null;

  return (
    <Autocomplete
      options={compatibleEmployees}
      value={selected}
      onChange={(_event, newValue) => onChange(newValue?.id ?? 0)}
      getOptionLabel={(employee) => `${employee.firstName} ${employee.lastName}`}
      isOptionEqualToValue={(option, selectedOpt) => option.id === selectedOpt.id}
      loading={isLoading}
      disabled={disabled || isLoading}
      noOptionsText="Sin resultados."
      renderOption={(props, employee) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            component="li"
            key={key}
            {...optionProps}
            sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <Avatar sx={{ bgcolor: employee.color, width: 28, height: 28, fontSize: 12 }}>
              {getInitials(employee.firstName, employee.lastName)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2">{`${employee.firstName} ${employee.lastName}`}</Typography>
              {employee.services.length > 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ display: "block", maxWidth: 280 }}
                >
                  {employee.services.map((service) => service.name).join(", ")}
                </Typography>
              )}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Empleado"
          placeholder="Seleccioná un empleado"
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
