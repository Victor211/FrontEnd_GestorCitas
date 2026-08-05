export interface Service {
  id: number;
  name: string;
  description: string | null;
  durationMinutes: number;
  price: number;
  color: string;
  businessId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  color: string;
}

export type UpdateServiceRequest = CreateServiceRequest;

export interface ServicesListParams {
  page: number;
  size: number;
  name?: string;
}
