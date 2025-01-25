import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Optional property
    }
  }
}
