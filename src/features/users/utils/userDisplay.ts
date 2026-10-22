import { isApiError } from "../../../utils/getApiErrorMessage";
import type { UserRole } from "../types/user.types";

export const ROLE_LABELS: Record<UserRole, string> = {
  OWNER: "Propietario",
  ADMIN: "Administrador",
  STAFF: "Personal",
};

export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role] ?? role;
}

const DEFAULT_ERROR = "No se pudo completar la operación.";

const COMMON_STATUS_MESSAGES: Partial<Record<number, string>> = {
  403: "No tenés permisos para administrar usuarios.",
  404: "El usuario no existe o no pertenece a tu negocio.",
};

export function getCreateUserErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.status === 409) {
      return "Ya existe una cuenta con ese correo electrónico.";
    }
    if (error.status === 403) {
      return COMMON_STATUS_MESSAGES[403] ?? DEFAULT_ERROR;
    }
    return error.message || DEFAULT_ERROR;
  }
  return DEFAULT_ERROR;
}

export function getUpdateStatusErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.status === 409) {
      // El backend explica el motivo (cuenta propia o último propietario activo).
      return error.message || "Esta operación no está permitida para este usuario.";
    }
    return COMMON_STATUS_MESSAGES[error.status] ?? (error.message || DEFAULT_ERROR);
  }
  return DEFAULT_ERROR;
}
