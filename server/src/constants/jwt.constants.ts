import { SignOptions } from 'jsonwebtoken';
import { APP_CONFIG } from './config.constants';

export const accessTokenSignOptions: SignOptions = {
  expiresIn: APP_CONFIG.jwt.accessExpiration,
};

export const refreshTokenSignOptions: SignOptions = {
  expiresIn: APP_CONFIG.jwt.refreshExpiration,
};
