export interface PaginationResponse {
  currentPage?: number | null;
  nextPage?: number | null;
  previousPage?: number | null;

  totalPages?: number | null;
  count?: number | null;
  limit?: number | null;
  offset?: number | null;
}
