export interface EmployeeServiceSummary {
  id: number;
  name: string;
  durationMinutes: number;
  price: number;
  color: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  color: string;
  businessId: number;
  services: EmployeeServiceSummary[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  color: string;
  serviceIds: number[];
}

export type UpdateEmployeeRequest = CreateEmployeeRequest;

export interface EmployeeFilters {
  page: number;
  size: number;
  name?: string;
}
