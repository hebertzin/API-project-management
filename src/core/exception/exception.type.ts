export type ExceptionMessage = string | { key: string; value: string }[];

export type Exception = {
  message: ExceptionMessage;
  statusCode: number;
};
