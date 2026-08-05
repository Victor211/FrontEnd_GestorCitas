import { Autocomplete, Avatar, Box, TextField, Typography } from "@mui/material";
import type { Employee } from "../../employees/types/employee.types";
import { getInitials } from "../../../utils/getInitials";

interface EmployeeScheduleSelectorProps {
  employees: Employee[];
  value: Employee | null;
  onChange: (employee: Employee | null) => void;
}

export function EmployeeScheduleSelector({
  employees,
  value,
  onChange,
}: EmployeeScheduleSelectorProps) {
  return (
    <Autocomplete
      options={employees}
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      getOptionLabel={(employee) => `${employee.firstName} ${employee.lastName}`}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      noOptionsText="No hay empleados activos disponibles."
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
                  sx={{ display: "block", maxWidth: 320 }}
                >
                  {employee.services.map((service) => service.name).join(", ")}
                </Typography>
              )}
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Empleado" placeholder="Seleccioná un empleado" />
      )}
      sx={{ maxWidth: { sm: 420 } }}
    />
  );
}
