import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { FullScreenLoader } from "../../components/feedback/FullScreenLoader";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROUTES } from "../../routes/paths";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { authenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <FullScreenLoader />;
  }

  if (authenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
