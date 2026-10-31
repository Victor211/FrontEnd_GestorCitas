import { useAuth } from "./useAuth";

/** Roles autorizados a eliminar definitivamente (el backend lo valida igualmente). */
const PERMANENT_DELETE_ROLES = ["OWNER", "ADMIN"];

export function useCanPermanentDelete(): boolean {
  const { user } = useAuth();
  return user !== null && PERMANENT_DELETE_ROLES.includes(user.role);
}
