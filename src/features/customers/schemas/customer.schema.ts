import { z } from "zod";
import type { CreateCustomerRequest, Customer } from "../types/customer.types";

function isValidEmailFormat(value: string): boolean {
  return z.string().email().safeParse(value).success;
}

export const customerSchema = z.object({
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
    .min(6, "El teléfono debe tener al menos 6 caracteres.")
    .max(30, "El teléfono no puede superar los 30 caracteres."),
  email: z
    .string()
    .trim()
    .max(150, "El email no puede superar los 150 caracteres.")
    .refine((value) => value === "" || isValidEmailFormat(value), "Ingresá un email válido."),
  notes: z
    .string()
    .trim()
    .max(1000, "Las notas no pueden superar los 1000 caracteres."),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

export const customerFormDefaultValues: CustomerFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  notes: "",
};

export function toCustomerFormValues(customer: Customer): CustomerFormValues {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    email: customer.email ?? "",
    notes: customer.notes ?? "",
  };
}

export function normalizeCustomerPayload(
  values: CustomerFormValues,
): CreateCustomerRequest {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    phone: values.phone.trim(),
    email: values.email.trim() || null,
    notes: values.notes.trim() || null,
  };
}
