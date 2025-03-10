import { NextFunction, RequestHandler, Response, Request } from 'express';
import { HttpStatusCode } from '../types/http.types.d';
import { UserRole } from '../types/user.types.d';
import {
  generateAccessToken,
  generateRefreshToken,
  setTokensInCookies,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwt.utils';
import { QueryFailedError } from 'typeorm';
import { UserService } from '../services/User.service';

export class Auth {
  authenticateAccessToken: RequestHandler = async (req, res, next) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const decodedToken = verifyAccessToken(accessToken);

      if (!decodedToken || typeof decodedToken === 'string') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
        return;
      }

      req.user = decodedToken;
      next();
    } catch {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
  };

  authorize = (roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (typeof req?.user === 'string' || !roles.includes(req?.user?.role)) {
        res.status(HttpStatusCode.FORBIDDEN).json({ error: 'Forbidden' });
        return;
      }

      next();
    };
  };

  refreshTokens: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const decodedRefreshToken = verifyRefreshToken(refreshToken);

      if (!decodedRefreshToken || typeof decodedRefreshToken === 'string') throw new Error('Bad token');

      const user = await new UserService().getById(decodedRefreshToken.id);

      if (!user) throw new Error('User not found');

      const newAccessToken = generateAccessToken({ id: user.id, username: user.username, role: user.role });
      const newRefreshToken = generateRefreshToken({ id: user.id });

      setTokensInCookies(res, newAccessToken, newRefreshToken);

      res.sendStatus(HttpStatusCode.NO_CONTENT);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'An error occured when trying to query the DB' });
      }

      res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }
  };

  checkAuth: RequestHandler = async (req, res) => {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
      return;
    }

    try {
      const user = verifyAccessToken(accessToken);

      if (!user || typeof user === 'string') {
        res.status(HttpStatusCode.UNAUTHORIZED).json({ error: 'Unauthorized' });
        return;
      }

      res.status(HttpStatusCode.OK).json({ id: user.id, username: user.username, role: user.role });
    } catch {
      res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    }
  };
}
