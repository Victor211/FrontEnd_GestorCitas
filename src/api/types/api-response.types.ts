export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: boolean;
  message: string;
  /** Código estable del backend (p. ej. SESSION_REPLACED); solo en algunos errores. */
  code?: string;
  errors: string[] | null;
  timestamp: string;
  status: number;
  path: string;
}
