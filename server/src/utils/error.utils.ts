import { Response } from 'express';

export function getErrorMsg(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export interface InformativeError {
  _getErrorInfo(error: unknown): string;
}

export interface ResponseError {
  handleErrorResponse(error: unknown, res: Response): void;
}
