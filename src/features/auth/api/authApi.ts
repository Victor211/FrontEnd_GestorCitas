import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type {
  AuthResponse,
  CurrentUser,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.types";

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/api/auth/login",
    request,
  );
  return data.data;
}

export async function register(
  request: RegisterRequest,
): Promise<AuthResponse> {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/api/auth/register",
    request,
  );
  return data.data;
}

const LOGOUT_TIMEOUT_MS = 3_000;

/** Revoca en el servidor la sesión del token indicado (HTTP 204). */
export async function logout(accessToken: string): Promise<void> {
  await apiClient.post("/api/auth/logout", null, {
    headers: { Authorization: `Bearer ${accessToken}` },
    timeout: LOGOUT_TIMEOUT_MS,
  });
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } =
    await apiClient.get<ApiResponse<CurrentUser>>("/api/auth/me");
  return data.data;
}
