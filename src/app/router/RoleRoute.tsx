import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROUTES } from "../../routes/paths";

interface RoleRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

// Se usa dentro de ProtectedRoute: el usuario ya está autenticado y cargado.
export function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
