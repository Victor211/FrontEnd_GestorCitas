import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { DashboardResponse } from "../types/dashboard.types";

export async function getDashboard(): Promise<DashboardResponse> {
  const { data } =
    await apiClient.get<ApiResponse<DashboardResponse>>("/api/dashboard");
  return data.data;
}
