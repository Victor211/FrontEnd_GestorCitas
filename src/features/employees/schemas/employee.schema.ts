import { z } from "zod";
import { HEX_COLOR_REGEX } from "../../services/schemas/service.schema";
import type { CreateEmployeeRequest, Employee } from "../types/employee.types";

function isValidEmailFormat(value: string): boolean {
  return z.string().email().safeParse(value).success;
}

export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
  lastName: z
    .string()
    .trim()
    .min(2, "El apellido debe tener al menos 2 caracteres.")
    .max(100, "El apellido no puede superar los 100 caracteres."),
  phone: z
    .string()
    .trim()
    .max(30, "El teléfono no puede superar los 30 caracteres."),
  email: z
    .string()
    .trim()
    .max(150, "El email no puede superar los 150 caracteres.")
    .refine((value) => value === "" || isValidEmailFormat(value), "Ingresá un email válido."),
  color: z
    .string()
    .trim()
    .regex(HEX_COLOR_REGEX, "El color debe tener el formato #RRGGBB."),
  serviceIds: z
    .array(z.number())
    .min(1, "Seleccioná al menos un servicio.")
    .refine((ids) => new Set(ids).size === ids.length, "No se pueden repetir servicios."),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export const employeeFormDefaultValues: EmployeeFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  color: "#1976D2",
  serviceIds: [],
};

export function toEmployeeFormValues(employee: Employee): EmployeeFormValues {
  return {
    firstName: employee.firstName,
    lastName: employee.lastName,
    phone: employee.phone ?? "",
    email: employee.email ?? "",
    color: employee.color,
    serviceIds: employee.services.map((service) => service.id),
  };
}

export function normalizeEmployeePayload(
  values: EmployeeFormValues,
): CreateEmployeeRequest {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    phone: values.phone.trim() || null,
    email: values.email.trim() || null,
    color: values.color.toUpperCase(),
    serviceIds: values.serviceIds,
  };
}
