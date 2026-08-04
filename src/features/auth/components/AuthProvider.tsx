import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { sessionManager } from "../../../api/client/sessionManager";
import { tokenStorage } from "../../../api/client/tokenStorage";
import { authKeys } from "../api/authKeys";
import { AuthContext } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { AuthResponse } from "../types/auth.types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    tokenStorage.getAccessToken(),
  );

  const currentUserQuery = useCurrentUser({ enabled: accessToken !== null });

  const clearSession = useCallback(() => {
    tokenStorage.removeAccessToken();
    setAccessTokenState(null);
    queryClient.removeQueries({ queryKey: authKeys.currentUser });
  }, [queryClient]);

  useEffect(() => {
    sessionManager.registerUnauthorizedHandler(clearSession);
    return () => sessionManager.registerUnauthorizedHandler(null);
  }, [clearSession]);

  const loginSession = useCallback(
    (authResponse: AuthResponse) => {
      tokenStorage.setAccessToken(authResponse.accessToken);
      setAccessTokenState(authResponse.accessToken);
      queryClient.setQueryData(authKeys.currentUser, authResponse.user);
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const refreshCurrentUser = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: authKeys.currentUser });
  }, [queryClient]);

  const isInitializing = accessToken !== null && currentUserQuery.isPending;

  const value = useMemo(
    () => ({
      accessToken,
      user: currentUserQuery.data ?? null,
      authenticated: accessToken !== null && currentUserQuery.isSuccess,
      isInitializing,
      loginSession,
      logout,
      refreshCurrentUser,
    }),
    [
      accessToken,
      currentUserQuery.data,
      currentUserQuery.isSuccess,
      isInitializing,
      loginSession,
      logout,
      refreshCurrentUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
