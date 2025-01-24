import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../constants/config.constants';
import { AccessTokenPayload, RefreshTokenPayload } from '../types/jwt.types.d';
import { accessTokenSignOptions, refreshTokenSignOptions } from '../constants/jwt.constants';

export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, APP_CONFIG.jwt.accessSecret, accessTokenSignOptions);
}

export function generateRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, APP_CONFIG.jwt.refreshSecret, refreshTokenSignOptions);
}
