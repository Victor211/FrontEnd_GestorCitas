import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "../../lib/env";
import type { ApiError } from "../types/api-response.types";
import { sessionManager } from "./sessionManager";
import { tokenStorage } from "./tokenStorage";

const LOGIN_ENDPOINT = "/api/auth/login";

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const isLoginRequest = error.config?.url?.includes(LOGIN_ENDPOINT);

    if (error.response?.status === 401 && !isLoginRequest) {
      tokenStorage.removeAccessToken();
      sessionManager.notifyUnauthorized();
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
