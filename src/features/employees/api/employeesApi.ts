import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  CreateEmployeeRequest,
  Employee,
  EmployeeFilters,
  UpdateEmployeeRequest,
} from "../types/employee.types";

export async function getEmployees(
  params: EmployeeFilters,
): Promise<PageResponse<Employee>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<Employee>>>(
    "/api/employees",
    { params },
  );
  return data.data;
}

export async function getEmployeeById(id: number): Promise<Employee> {
  const { data } = await apiClient.get<ApiResponse<Employee>>(
    `/api/employees/${id}`,
  );
  return data.data;
}

export async function createEmployee(
  request: CreateEmployeeRequest,
): Promise<Employee> {
  const { data } = await apiClient.post<ApiResponse<Employee>>(
    "/api/employees",
    request,
  );
  return data.data;
}

export async function updateEmployee(
  id: number,
  request: UpdateEmployeeRequest,
): Promise<Employee> {
  const { data } = await apiClient.put<ApiResponse<Employee>>(
    `/api/employees/${id}`,
    request,
  );
  return data.data;
}

export async function deleteEmployee(id: number): Promise<void> {
  await apiClient.delete(`/api/employees/${id}`);
}
