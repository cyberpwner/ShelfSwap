import { NextFunction, Response } from 'express';
import { HttpStatusCode } from '../types/http.types.d';
import { verify } from 'jsonwebtoken';
import { APP_CONFIG } from '../constants/config.constants';
import { AuthenticatedRequest } from '../types/express.types';
import { UserRole } from '../types/user.types';
// import { UserService } from '../services/User.service';

export class Auth {
  authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    const decodedToken = verify(token, APP_CONFIG.jwt.accessSecret);

    if (!decodedToken || typeof decodedToken === 'string') {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
      return;
    }

    // const currentUser = await new UserService().getUserById(decodedToken.id);

    req['user'] = decodedToken;
    next();
  };

  authorize = (roles: UserRole[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      if (typeof req['user'] === 'string' || !roles.includes(req['user']?.role)) {
        res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Forbidden' });
        return;
      }

      next();
    };
  };
}
