import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  CreateUserRequest,
  ManagedUser,
  UpdateUserStatusRequest,
  UserFilters,
} from "../types/user.types";

export async function getUsers(
  params: UserFilters,
): Promise<PageResponse<ManagedUser>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<ManagedUser>>>(
    "/api/users",
    { params },
  );
  return data.data;
}

export async function createUser(
  request: CreateUserRequest,
): Promise<ManagedUser> {
  const { data } = await apiClient.post<ApiResponse<ManagedUser>>(
    "/api/users",
    request,
  );
  return data.data;
}

export async function updateUserStatus(
  id: number,
  request: UpdateUserStatusRequest,
): Promise<ManagedUser> {
  const { data } = await apiClient.patch<ApiResponse<ManagedUser>>(
    `/api/users/${id}/status`,
    request,
  );
  return data.data;
}
