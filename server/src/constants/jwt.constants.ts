import { SignOptions } from 'jsonwebtoken';
import { APP_CONFIG } from './config.constants';
import { fifteenMinutesInMilliSec, oneDayInMilliSec } from './date.constants';

export const accessTokenSignOptions: SignOptions = {
  expiresIn: APP_CONFIG.jwt.accessExpiration,
};

export const refreshTokenSignOptions: SignOptions = {
  expiresIn: APP_CONFIG.jwt.refreshExpiration,
};

export const TokenMaxAge = {
  ACCESS_TOKEN: fifteenMinutesInMilliSec,
  REFRESH_TOKEN: oneDayInMilliSec,
};
