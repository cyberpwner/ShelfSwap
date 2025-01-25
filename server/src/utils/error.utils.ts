/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatusCode } from '../types/http.types.d';

export function getErrorMsg(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export interface InformativeError {
  _getErrorInfo(error: unknown): string;
}

export class ValidationErrorHandler {
  static handleZodError(error: unknown, res: Response): void {
    if (error instanceof ZodError) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ errors: error.flatten() });
      return;
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
  }
}
