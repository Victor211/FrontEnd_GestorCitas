export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}
