import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import { AppConfig } from '../types/config.types.d';

const SERVER_CONFIG = config.get<AppConfig['server']>('server');
const DB_CONFIG = config.get<AppConfig['database']>('database');
const BCRYPT_CONFIG = config.get<AppConfig['bcrypt']>('bcrypt');
const JWT_CONFIG = config.get<AppConfig['jwt']>('jwt');
const ENV_CONFIG = config.get<AppConfig['env']>('env');
const CLOUDINARY_CONFIG = config.get<AppConfig['cloudinary']>('cloudinary');

export const APP_CONFIG: AppConfig = {
  server: { ...SERVER_CONFIG, port: Number(SERVER_CONFIG.port) },
  database: DB_CONFIG,
  bcrypt: { ...BCRYPT_CONFIG, saltRounds: Number(BCRYPT_CONFIG.saltRounds) },
  jwt: JWT_CONFIG,
  env: ENV_CONFIG,
  cloudinary: CLOUDINARY_CONFIG,
};
