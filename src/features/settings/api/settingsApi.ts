import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { BusinessSettings, UpdateBusinessSettingsRequest } from "../types/settings.types";

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const { data } = await apiClient.get<ApiResponse<BusinessSettings>>(
    "/api/settings/business",
  );
  return data.data;
}

export async function updateBusinessSettings(
  request: UpdateBusinessSettingsRequest,
): Promise<BusinessSettings> {
  const { data } = await apiClient.put<ApiResponse<BusinessSettings>>(
    "/api/settings/business",
    request,
  );
  return data.data;
}
