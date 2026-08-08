export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface Appointment {
  id: number;
  businessId: number;
  customerId: number;
  customerName: string;
  employeeId: number;
  employeeName: string;
  serviceId: number;
  serviceName: string;
  serviceDurationMinutes: number;
  servicePrice: number;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  customerId: number;
  employeeId: number;
  serviceId: number;
  startAt: string;
  notes?: string;
}

export interface RescheduleAppointmentRequest {
  startAt: string;
}

export interface UpdateAppointmentStatusRequest {
  status: AppointmentStatus;
}

export interface AppointmentFilters {
  page: number;
  size: number;
  employeeId?: number;
  customerId?: number;
  status?: AppointmentStatus;
  from?: string;
  to?: string;
}

export interface AppointmentFormValues {
  customerId: number;
  employeeId: number;
  serviceId: number;
  startAt: string;
  notes: string;
}
