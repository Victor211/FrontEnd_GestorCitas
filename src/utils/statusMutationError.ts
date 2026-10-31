import { isApiError } from "./getApiErrorMessage";

export function isConflictError(error: unknown): boolean {
  return isApiError(error) && error.status === 409;
}

const ALREADY_IN_STATE_PATTERN = /\bya (?:est[áa]|se encuentra|fue|se)\b.*\binactiv|\bya (?:est[áa]|se encuentra|fue|se)\b.*\bactiv/i;

/**
 * Detecta un 409 que indica que el registro ya estaba en el estado pedido
 * (ya activo / ya inactivo), para sincronizar el listado en vez de mostrar un error.
 */
export function isAlreadyInStateError(error: unknown): boolean {
  return (
    isConflictError(error) &&
    isApiError(error) &&
    ALREADY_IN_STATE_PATTERN.test(error.message ?? "")
  );
}
