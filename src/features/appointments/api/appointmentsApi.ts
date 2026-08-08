import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  Appointment,
  AppointmentFilters,
  CreateAppointmentRequest,
  RescheduleAppointmentRequest,
  UpdateAppointmentStatusRequest,
} from "../types/appointment.types";

export async function getAppointments(
  params: AppointmentFilters,
): Promise<PageResponse<Appointment>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<Appointment>>>(
    "/api/appointments",
    { params },
  );
  return data.data;
}

export async function getAppointmentById(id: number): Promise<Appointment> {
  const { data } = await apiClient.get<ApiResponse<Appointment>>(
    `/api/appointments/${id}`,
  );
  return data.data;
}

export async function createAppointment(
  request: CreateAppointmentRequest,
): Promise<Appointment> {
  const { data } = await apiClient.post<ApiResponse<Appointment>>(
    "/api/appointments",
    request,
  );
  return data.data;
}

export async function rescheduleAppointment(
  id: number,
  request: RescheduleAppointmentRequest,
): Promise<Appointment> {
  const { data } = await apiClient.put<ApiResponse<Appointment>>(
    `/api/appointments/${id}/reschedule`,
    request,
  );
  return data.data;
}

export async function updateAppointmentStatus(
  id: number,
  request: UpdateAppointmentStatusRequest,
): Promise<Appointment> {
  const { data } = await apiClient.patch<ApiResponse<Appointment>>(
    `/api/appointments/${id}/status`,
    request,
  );
  return data.data;
}

export async function cancelAppointment(id: number): Promise<Appointment> {
  const { data } = await apiClient.patch<ApiResponse<Appointment>>(
    `/api/appointments/${id}/cancel`,
  );
  return data.data;
}
