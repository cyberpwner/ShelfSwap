import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import { AppConfig } from '../types/config.types';

const SERVER_CONFIG = config.get<AppConfig['server']>('server');
const DB_CONFIG = config.get<AppConfig['database']>('database');
const BCRYPT_CONFIG = config.get<AppConfig['bcrypt']>('bcrypt');

export const APP_CONFIG: AppConfig = {
  server: { ...SERVER_CONFIG, port: Number(SERVER_CONFIG.port) },
  database: DB_CONFIG,
  bcrypt: { ...BCRYPT_CONFIG, saltRounds: Number(BCRYPT_CONFIG.saltRounds) },
};
