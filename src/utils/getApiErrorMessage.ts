import type { ApiError } from "../api/types/api-response.types";

const DEFAULT_MESSAGE = "No se pudo completar la operación.";

const STATUS_FALLBACK_MESSAGES: Record<number, string> = {
  400: "Datos inválidos.",
  401: "Credenciales inválidas.",
  409: "El email ya está registrado.",
  500: DEFAULT_MESSAGE,
};

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "status" in error
  );
}

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return (
      error.message || STATUS_FALLBACK_MESSAGES[error.status] || DEFAULT_MESSAGE
    );
  }

  return DEFAULT_MESSAGE;
}
