import { AppConfig } from '../src/types/config.types';

const config: AppConfig = {
  database: {
    username: 'root',
    password: '',
    database: 'defaultDb',
    host: 'localhost',
    dialect: 'mysql',
  },
  server: {
    port: 3306,
  },
  bcrypt: {
    saltRounds: 10,
  },
  jwt: {
    accessSecret: 'JWT_ACCESS_SECRET',
    refreshSecret: 'JWT_REFRESH_SECRET',
    accessExpiration: 'JWT_ACCESS_EXPIRATION',
    refreshExpiration: 'JWT_REFRESH_EXPIRATION',
  },
};

export default config;
