import { useQueryClient } from "@tanstack/react-query";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  sessionManager,
  type SessionEndReason,
} from "../../../api/client/sessionManager";
import {
  ACCESS_TOKEN_KEY,
  tokenStorage,
} from "../../../api/client/tokenStorage";
import { authKeys } from "../api/authKeys";
import { logout as logoutRequest } from "../api/authApi";
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
  const [sessionNotice, setSessionNotice] = useState<SessionEndReason | null>(
    null,
  );
  const isLoggingOut = useRef(false);
  const tokenRef = useRef(accessToken);
  useEffect(() => {
    tokenRef.current = accessToken;
  }, [accessToken]);

  const currentUserQuery = useCurrentUser({ enabled: accessToken !== null });

  // Limpia estado y caché privada; el token ya debe estar resuelto por el llamador.
  const resetLocalState = useCallback(() => {
    setAccessTokenState(null);
    void queryClient.cancelQueries();
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    // El interceptor ya descartó 401 obsoletos y eliminó el token vigente.
    sessionManager.registerUnauthorizedHandler((reason) => {
      // Un logout en curso se encarga de limpiar y no debe mostrar aviso.
      if (isLoggingOut.current) {
        return;
      }
      setSessionNotice(reason);
      resetLocalState();
    });
    return () => sessionManager.registerUnauthorizedHandler(null);
  }, [resetLocalState]);

  // Sincroniza pestañas: el evento `storage` solo se dispara en las demás.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== ACCESS_TOKEN_KEY) {
        return;
      }

      const storedToken = tokenStorage.getAccessToken();
      if (storedToken === tokenRef.current) {
        return;
      }

      // Logout, login o cambio de cuenta en otra pestaña: descarta datos privados.
      tokenRef.current = storedToken;
      setAccessTokenState(storedToken);
      void queryClient.cancelQueries();
      queryClient.clear();
      if (storedToken !== null) {
        setSessionNotice(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [queryClient]);

  const loginSession = useCallback(
    (authResponse: AuthResponse) => {
      tokenStorage.setAccessToken(authResponse.accessToken);
      setAccessTokenState(authResponse.accessToken);
      setSessionNotice(null);
      queryClient.setQueryData(authKeys.currentUser, authResponse.user);
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    const tokenToRevoke = tokenStorage.getAccessToken();

    if (isLoggingOut.current) {
      return;
    }
    isLoggingOut.current = true;

    try {
      if (tokenToRevoke) {
        // 204 = revocada. Un 401 (expirado/reemplazado) o un error de red no
        // impiden cerrar localmente; en red caída la revocación en el servidor
        // no queda confirmada y el JWT sigue válido hasta que expire.
        await logoutRequest(tokenToRevoke).catch(() => undefined);
      }
    } finally {
      isLoggingOut.current = false;
      // Si otro login (p. ej. en otra pestaña) cambió el token mientras
      // esperábamos, esa sesión nueva no se toca.
      if (tokenStorage.getAccessToken() === tokenToRevoke) {
        tokenStorage.removeAccessToken();
        setSessionNotice(null);
        resetLocalState();
      }
    }
  }, [resetLocalState]);

  const clearSessionNotice = useCallback(() => setSessionNotice(null), []);

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
      sessionNotice,
      loginSession,
      logout,
      clearSessionNotice,
      refreshCurrentUser,
    }),
    [
      accessToken,
      currentUserQuery.data,
      currentUserQuery.isSuccess,
      isInitializing,
      sessionNotice,
      loginSession,
      logout,
      clearSessionNotice,
      refreshCurrentUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
