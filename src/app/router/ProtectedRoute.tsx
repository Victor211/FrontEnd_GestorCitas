import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { FullScreenLoader } from "../../components/feedback/FullScreenLoader";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROUTES } from "../../routes/paths";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <FullScreenLoader />;
  }

  if (!authenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}
