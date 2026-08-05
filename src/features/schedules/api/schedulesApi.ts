import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type {
  CreateScheduleRequest,
  Schedule,
  ScheduleFilters,
  UpdateScheduleRequest,
} from "../types/schedule.types";

export async function getSchedules(params: ScheduleFilters = {}): Promise<Schedule[]> {
  const { data } = await apiClient.get<ApiResponse<Schedule[]>>("/api/schedules", {
    params,
  });
  return data.data;
}

export async function getScheduleById(id: number): Promise<Schedule> {
  const { data } = await apiClient.get<ApiResponse<Schedule>>(`/api/schedules/${id}`);
  return data.data;
}

export async function getSchedulesByEmployee(employeeId: number): Promise<Schedule[]> {
  const { data } = await apiClient.get<ApiResponse<Schedule[]>>(
    `/api/schedules/employee/${employeeId}`,
  );
  return data.data;
}

export async function createSchedule(
  request: CreateScheduleRequest,
): Promise<Schedule> {
  const { data } = await apiClient.post<ApiResponse<Schedule>>(
    "/api/schedules",
    request,
  );
  return data.data;
}

export async function updateSchedule(
  id: number,
  request: UpdateScheduleRequest,
): Promise<Schedule> {
  const { data } = await apiClient.put<ApiResponse<Schedule>>(
    `/api/schedules/${id}`,
    request,
  );
  return data.data;
}

export async function deleteSchedule(id: number): Promise<void> {
  await apiClient.delete(`/api/schedules/${id}`);
}
