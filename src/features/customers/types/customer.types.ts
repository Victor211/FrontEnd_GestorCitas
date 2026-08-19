export interface Customer {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phone: string;
  email: string | null;
  notes: string | null;
  businessId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  notes: string | null;
}

export type UpdateCustomerRequest = CreateCustomerRequest;

export interface CustomerFilters {
  page: number;
  size: number;
  name?: string;
}
