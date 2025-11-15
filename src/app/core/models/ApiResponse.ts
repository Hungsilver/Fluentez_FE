export interface IApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  status: number;
  totalRecords?: number;
}
