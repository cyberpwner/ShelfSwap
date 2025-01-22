import { Express } from 'express';

export function getErrorMsg(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export interface InformativeError {
  _getErrorInfo(error: unknown): string;
}

export interface ResponseError {
  handleErrorResponse(error: unknown, res: Express.Response): void;
}
