import dotenv from 'dotenv';
import { AppConfig } from '../src/types/config.types.d';

dotenv.config();

const productionConfig: AppConfig = {
  database: {
    username: 'produser',
    password: 'prodpass',
    database: 'proddb',
    host: 'prod-db-host',
    dialect: 'mysql',
  },
  server: {
    port: 1234,
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
  env: {
    nodeEnv: 'production',
  },
};

export default productionConfig;
