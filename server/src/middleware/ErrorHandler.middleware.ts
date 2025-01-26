import { ErrorRequestHandler } from 'express';
import { MulterError } from 'multer';
import { HttpStatusCode } from '../types/http.types.d';

export class ErrorHandler {
  handleMulterErrors: ErrorRequestHandler = (error, req, res) => {
    if (error instanceof MulterError) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
      return;
    }

    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  };
}
