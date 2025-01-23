import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';

export class RateLimiter {
  rateLimiter: RequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    keyGenerator: (req) => {
      // TODO: change key to user id (from authentication middleware) and make ip a fallback
      return req.ip || '';
    },
    message: 'Too many requests. Please try again later.',
  });
}
