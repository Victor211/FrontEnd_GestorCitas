import { z } from "zod";
import type { CreateServiceRequest, Service } from "../types/service.types";

export const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

export const serviceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(100, "El nombre no puede superar los 100 caracteres."),
  description: z
    .string()
    .trim()
    .max(500, "La descripción no puede superar los 500 caracteres."),
  durationMinutes: z
    .number("La duración es obligatoria.")
    .int("La duración debe ser un número entero.")
    .positive("La duración debe ser mayor a 0 minutos.")
    .max(480, "La duración no puede superar los 480 minutos."),
  price: z
    .number("El precio es obligatorio.")
    .positive("El precio debe ser mayor a 0."),
  color: z
    .string()
    .trim()
    .regex(HEX_COLOR_REGEX, "El color debe tener el formato #RRGGBB."),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const serviceFormDefaultValues: ServiceFormValues = {
  name: "",
  description: "",
  durationMinutes: 30,
  price: 0,
  color: "#1976D2",
};

export function toServiceFormValues(service: Service): ServiceFormValues {
  return {
    name: service.name,
    description: service.description ?? "",
    durationMinutes: service.durationMinutes,
    price: service.price,
    color: service.color,
  };
}

export function toServiceRequest(
  values: ServiceFormValues,
): CreateServiceRequest {
  return {
    name: values.name.trim(),
    description: values.description.trim() ? values.description.trim() : undefined,
    durationMinutes: values.durationMinutes,
    price: values.price,
    color: values.color.toUpperCase(),
  };
}
