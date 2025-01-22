export function getErrorMsg(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export interface InformativeError {
  _getErrorInfo(error: unknown): string;
}
