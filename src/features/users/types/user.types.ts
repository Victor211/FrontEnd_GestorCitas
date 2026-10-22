export type UserRole = "OWNER" | "ADMIN" | "STAFF";

export type AssignableUserRole = Exclude<UserRole, "OWNER">;

export interface ManagedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: AssignableUserRole;
}

export interface UpdateUserStatusRequest {
  active: boolean;
}

export interface UserFilters {
  page: number;
  size: number;
}
