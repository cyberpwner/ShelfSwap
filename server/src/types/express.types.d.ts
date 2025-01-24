import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface AuthenticatedRequest extends Request {
  user: string | JwtPayload;
}
