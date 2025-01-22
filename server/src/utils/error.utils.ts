/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Response } from 'express';
import { ZodError } from 'zod';

export function getErrorMsg(error: unknown) {
  return error instanceof Error ? error.message : error;
}

export interface InformativeError {
  _getErrorInfo(error: unknown): string;
}

export class ValidationErrorHandler {
  static handleZodError(error: unknown, res: Response): void {
    if (error instanceof ZodError) {
      res.status(400).json({ errors: error.flatten() });
      return;
    }

    res.status(500).json({ message: 'Internal server error.' });
  }
}
