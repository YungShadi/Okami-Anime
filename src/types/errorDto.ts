export interface ErrorDto {
  errorObj: Array<{
    statusCode?: number;
    errorMessage: string;
    index: number;
  }>;
  amountOfErrors: number;
}
