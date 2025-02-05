export interface PaginatedDto<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
