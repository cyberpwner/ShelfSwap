import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import { HttpStatusCode } from '../types/http.types.d';

export class RateLimiter {
  rateLimiter: RequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15000,
    keyGenerator: (req) => {
      // TODO: change key to user id (from authentication middleware) and make ip a fallback
      return req.ip || '';
    },
    message: { error: 'Too many requests. Please try again later.' },
    statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
  });
}
