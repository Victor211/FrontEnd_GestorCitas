export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  password: string;
  businessName: string;
  businessPhone: string;
  businessEmail?: string;
  businessAddress?: string;
  businessTimezone: string;
}

export interface CurrentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  businessId: number;
  businessName: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: CurrentUser;
}

export interface AuthContextValue {
  accessToken: string | null;
  user: CurrentUser | null;
  authenticated: boolean;
  isInitializing: boolean;
  loginSession: (authResponse: AuthResponse) => void;
  logout: () => void;
  refreshCurrentUser: () => void;
}
