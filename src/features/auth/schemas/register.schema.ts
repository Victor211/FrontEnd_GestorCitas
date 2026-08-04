import { z } from "zod";
import type { RegisterRequest } from "../types/auth.types";

export const DEFAULT_TIMEZONE = "America/Asuncion";

export const TIMEZONE_OPTIONS = [
  { value: "America/Asuncion", label: "America/Asuncion (Paraguay)" },
] as const;

export const registerSchema = z
  .object({
    ownerFirstName: z
      .string()
      .min(2, "Debe tener al menos 2 caracteres")
      .max(100, "Debe tener como máximo 100 caracteres"),
    ownerLastName: z
      .string()
      .min(2, "Debe tener al menos 2 caracteres")
      .max(100, "Debe tener como máximo 100 caracteres"),
    email: z
      .string()
      .min(1, "El email es obligatorio")
      .max(150, "Debe tener como máximo 150 caracteres")
      .email("Ingresá un email válido"),
    password: z.string().min(8, "Debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmá la contraseña"),
    businessName: z.string().min(1, "El nombre del negocio es obligatorio"),
    businessPhone: z.string().min(1, "El teléfono es obligatorio"),
    businessEmail: z
      .union([z.literal(""), z.string().email("Ingresá un email válido")])
      .optional(),
    businessAddress: z.string().optional(),
    businessTimezone: z.string().min(1, "La zona horaria es obligatoria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerDefaultValues: RegisterFormValues = {
  ownerFirstName: "",
  ownerLastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  businessName: "",
  businessPhone: "",
  businessEmail: "",
  businessAddress: "",
  businessTimezone: DEFAULT_TIMEZONE,
};

export function toRegisterRequest(
  values: RegisterFormValues,
): RegisterRequest {
  return {
    ownerFirstName: values.ownerFirstName,
    ownerLastName: values.ownerLastName,
    email: values.email,
    password: values.password,
    businessName: values.businessName,
    businessPhone: values.businessPhone,
    businessEmail: values.businessEmail ? values.businessEmail : undefined,
    businessAddress: values.businessAddress,
    businessTimezone: values.businessTimezone,
  };
}
