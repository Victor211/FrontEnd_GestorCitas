import { z } from "zod";
import type {
  BusinessSettings,
  SettingsFormValues,
  UpdateBusinessSettingsRequest,
} from "../types/settings.types";

function isValidEmailFormat(value: string): boolean {
  return z.string().email().safeParse(value).success;
}

export const settingsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(150, "El nombre no puede superar los 150 caracteres."),
  phone: z.string().trim().max(30, "El teléfono no puede superar los 30 caracteres."),
  email: z
    .string()
    .trim()
    .max(150, "El email no puede superar los 150 caracteres.")
    .refine((value) => value === "" || isValidEmailFormat(value), "Ingresá un email válido."),
  address: z.string().trim().max(255, "La dirección no puede superar los 255 caracteres."),
  timezone: z.string().trim().min(1, "La zona horaria es obligatoria."),
});

export function toSettingsFormValues(settings: BusinessSettings): SettingsFormValues {
  return {
    name: settings.name,
    phone: settings.phone ?? "",
    email: settings.email ?? "",
    address: settings.address ?? "",
    timezone: settings.timezone,
  };
}

export function normalizeBusinessSettingsPayload(
  values: SettingsFormValues,
): UpdateBusinessSettingsRequest {
  return {
    name: values.name.trim(),
    phone: values.phone.trim() || null,
    email: values.email.trim() || null,
    address: values.address.trim() || null,
    timezone: values.timezone.trim(),
  };
}
