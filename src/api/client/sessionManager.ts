/** Códigos 401 del backend que explican por qué terminó la sesión. */
export type SessionEndReason =
  | "SESSION_REPLACED"
  | "TOKEN_EXPIRED"
  | "TOKEN_INVALID"
  | "USER_DISABLED";

const SESSION_END_REASONS: ReadonlySet<string> = new Set<SessionEndReason>([
  "SESSION_REPLACED",
  "TOKEN_EXPIRED",
  "TOKEN_INVALID",
  "USER_DISABLED",
]);

export function toSessionEndReason(code: unknown): SessionEndReason | null {
  return typeof code === "string" && SESSION_END_REASONS.has(code)
    ? (code as SessionEndReason)
    : null;
}

type UnauthorizedHandler = (reason: SessionEndReason | null) => void;

let unauthorizedHandler: UnauthorizedHandler | null = null;

function registerUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = handler;
}

function notifyUnauthorized(reason: SessionEndReason | null): void {
  unauthorizedHandler?.(reason);
}

export const sessionManager = {
  registerUnauthorizedHandler,
  notifyUnauthorized,
};
