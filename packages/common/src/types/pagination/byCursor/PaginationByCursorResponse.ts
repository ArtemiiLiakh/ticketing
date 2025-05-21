export interface PaginationByCursorResponse<TData> {
  data: TData[],
  pagination: {
    cursor: string;
    hasNext: boolean;
  }
}