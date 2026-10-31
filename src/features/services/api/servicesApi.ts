import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  CreateServiceRequest,
  Service,
  ServicesListParams,
  UpdateServiceRequest,
} from "../types/service.types";

export async function getServices(
  params: ServicesListParams,
): Promise<PageResponse<Service>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<Service>>>(
    "/api/services",
    { params },
  );
  return data.data;
}

export async function getServiceById(id: number): Promise<Service> {
  const { data } = await apiClient.get<ApiResponse<Service>>(
    `/api/services/${id}`,
  );
  return data.data;
}

export async function createService(
  request: CreateServiceRequest,
): Promise<Service> {
  const { data } = await apiClient.post<ApiResponse<Service>>(
    "/api/services",
    request,
  );
  return data.data;
}

export async function updateService(
  id: number,
  request: UpdateServiceRequest,
): Promise<Service> {
  const { data } = await apiClient.put<ApiResponse<Service>>(
    `/api/services/${id}`,
    request,
  );
  return data.data;
}

/** Desactivación lógica (DELETE). */
export async function deactivateService(id: number): Promise<void> {
  await apiClient.delete(`/api/services/${id}`);
}

export async function activateService(id: number): Promise<void> {
  await apiClient.patch(`/api/services/${id}/activate`);
}

/** Eliminación definitiva (irreversible). */
export async function permanentDeleteService(id: number): Promise<void> {
  await apiClient.delete(`/api/services/${id}/permanent`);
}
