import { apiClient } from "../../../api/client/apiClient";
import type { ApiResponse } from "../../../api/types/api-response.types";
import type { PageResponse } from "../../../api/types/page-response.types";
import type {
  CreateCustomerRequest,
  Customer,
  CustomerFilters,
  UpdateCustomerRequest,
} from "../types/customer.types";

export async function getCustomers(
  params: CustomerFilters,
): Promise<PageResponse<Customer>> {
  const { data } = await apiClient.get<ApiResponse<PageResponse<Customer>>>(
    "/api/customers",
    { params },
  );
  return data.data;
}

export async function getCustomerById(id: number): Promise<Customer> {
  const { data } = await apiClient.get<ApiResponse<Customer>>(
    `/api/customers/${id}`,
  );
  return data.data;
}

export async function getCustomerByPhone(phone: string): Promise<Customer> {
  const { data } = await apiClient.get<ApiResponse<Customer>>(
    "/api/customers/by-phone",
    { params: { phone } },
  );
  return data.data;
}

export async function createCustomer(
  request: CreateCustomerRequest,
): Promise<Customer> {
  const { data } = await apiClient.post<ApiResponse<Customer>>(
    "/api/customers",
    request,
  );
  return data.data;
}

export async function updateCustomer(
  id: number,
  request: UpdateCustomerRequest,
): Promise<Customer> {
  const { data } = await apiClient.put<ApiResponse<Customer>>(
    `/api/customers/${id}`,
    request,
  );
  return data.data;
}

export async function deleteCustomer(id: number): Promise<void> {
  await apiClient.delete(`/api/customers/${id}`);
}
