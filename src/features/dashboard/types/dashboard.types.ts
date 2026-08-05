export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface UpcomingAppointment {
  id: number;
  customerId: number;
  customerName: string;
  employeeId: number;
  employeeName: string;
  serviceId: number;
  serviceName: string;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
}

export interface DashboardResponse {
  todayAppointments: number;
  activeCustomers: number;
  activeEmployees: number;
  activeServices: number;
  upcomingAppointments: UpcomingAppointment[];
}
