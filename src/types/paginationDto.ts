export interface PaginationDto {
  siblingCount: number;
  pageSize: number;
  totalCount: number;
  currentPageCatalogue: number;
  pageParams: URLSearchParams;
}
