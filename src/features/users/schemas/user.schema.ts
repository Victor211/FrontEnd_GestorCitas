import { z } from "zod";
import type { AssignableUserRole, CreateUserRequest } from "../types/user.types";

export const ASSIGNABLE_ROLES: AssignableUserRole[] = ["ADMIN", "STAFF"];

// Mismo límite que el backend: BCrypt solo considera los primeros 72 bytes.
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

export const userSchema = z.object({
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
  email: z
    .string()
    .trim()
    .min(1, "El correo electrónico es obligatorio.")
    .max(150, "El correo no puede superar los 150 caracteres.")
    .email("Ingresá un correo electrónico válido."),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, "La contraseña debe tener al menos 8 caracteres.")
    .refine(
      (value) => new TextEncoder().encode(value).length <= PASSWORD_MAX_BYTES,
      "La contraseña no puede superar los 72 bytes.",
    ),
  role: z.enum(["ADMIN", "STAFF"], { error: "Seleccioná un rol." }),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const userFormDefaultValues: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "STAFF",
};

export function toCreateUserRequest(values: UserFormValues): CreateUserRequest {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
    password: values.password,
    role: values.role,
  };
}
