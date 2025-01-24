import { NextFunction, RequestHandler, Response, Request } from 'express';
import { HttpStatusCode } from '../types/http.types.d';
import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../constants/config.constants';
import { UserRole } from '../types/user.types.d';

export class Auth {
  authenticate: RequestHandler = async (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, APP_CONFIG.jwt.accessSecret);

      if (!decodedToken || typeof decodedToken === 'string') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
        return;
      }

      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized', error });
    }
  };

  authorize = (roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (typeof req?.user === 'string' || !roles.includes(req?.user?.role)) {
        res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Forbidden' });
        return;
      }

      next();
    };
  };
}
