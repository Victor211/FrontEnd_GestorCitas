import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "../../lib/env";
import type { ApiError } from "../types/api-response.types";
import { sessionManager, toSessionEndReason } from "./sessionManager";
import { tokenStorage } from "./tokenStorage";

const LOGIN_ENDPOINT = "/api/auth/login";
const LOGOUT_ENDPOINT = "/api/auth/logout";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Respeta un Authorization explícito (el logout fija el token que va a revocar).
  if (config.headers.has("Authorization")) {
    return config;
  }

  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

/**
 * Un 401 solo invalida la sesión local si la solicitud fue enviada con el token
 * que sigue vigente. Una respuesta tardía de un token anterior (otro login,
 * otra pestaña) o un 401 concurrente ya gestionado se ignoran.
 */
function isCurrentSessionRequest(error: AxiosError<ApiError>): boolean {
  const sentAuthorization = error.config?.headers?.get("Authorization");
  const currentToken = tokenStorage.getAccessToken();

  return (
    currentToken !== null && sentAuthorization === `Bearer ${currentToken}`
  );
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const url = error.config?.url ?? "";
    // Login y logout gestionan sus propios errores.
    const isAuthFlowRequest =
      url.includes(LOGIN_ENDPOINT) || url.includes(LOGOUT_ENDPOINT);

    if (
      error.response?.status === 401 &&
      !isAuthFlowRequest &&
      isCurrentSessionRequest(error)
    ) {
      tokenStorage.removeAccessToken();
      sessionManager.notifyUnauthorized(
        toSessionEndReason(error.response.data?.code),
      );
    }

    const apiError: ApiError = error.response?.data ?? {
      success: false,
      message: "No se pudo conectar con el servidor.",
      errors: null,
      timestamp: new Date().toISOString(),
      status: error.response?.status ?? 0,
      path: error.config?.url ?? "",
    };

    return Promise.reject(apiError);
  },
);
