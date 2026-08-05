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

export async function deleteService(id: number): Promise<void> {
  await apiClient.delete(`/api/services/${id}`);
}
