import jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../constants/config.constants';
import { AccessTokenPayload, RefreshTokenPayload } from '../types/jwt.types.d';
import { Response } from 'express';
import { accessTokenSignOptions, refreshTokenSignOptions, TokenMaxAge } from '../constants/jwt.constants';

export function generateAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, APP_CONFIG.jwt.accessSecret, accessTokenSignOptions);
}

export function generateRefreshToken(payload: RefreshTokenPayload) {
  return jwt.sign(payload, APP_CONFIG.jwt.refreshSecret, refreshTokenSignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, APP_CONFIG.jwt.accessSecret);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, APP_CONFIG.jwt.refreshSecret);
}

export function setTokensInCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: APP_CONFIG.env.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge: TokenMaxAge.ACCESS_TOKEN,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: APP_CONFIG.env.nodeEnv === 'production',
    sameSite: 'strict',
    maxAge: TokenMaxAge.REFRESH_TOKEN,
  });
}
