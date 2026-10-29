import type { SessionEndReason } from "../../../api/client/sessionManager";

export const SESSION_NOTICE_MESSAGES: Record<SessionEndReason, string> = {
  SESSION_REPLACED:
    "Tu sesión se cerró porque se inició sesión con esta cuenta en otro dispositivo.",
  TOKEN_EXPIRED: "Tu sesión expiró. Iniciá sesión nuevamente.",
  TOKEN_INVALID: "Tu sesión no es válida. Iniciá sesión nuevamente.",
  USER_DISABLED:
    "Tu cuenta está desactivada. Contactá al administrador de tu negocio.",
};
