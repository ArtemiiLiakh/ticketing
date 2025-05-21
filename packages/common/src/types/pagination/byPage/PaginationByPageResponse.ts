export interface PaginationByPageResponse<TData> {
  data: TData[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    hasNext: boolean
  }
}