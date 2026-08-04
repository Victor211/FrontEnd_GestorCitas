export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  errors: string[] | null;
  timestamp: string;
  status: number;
  path: string;
}
