import dotenv from 'dotenv';
import { AppConfig } from '../src/types/config';

dotenv.config();

const developmentConfig: AppConfig = {
  database: {
    username: 'test',
    password: 'test',
    database: 'test',
    host: 'test',
    dialect: 'mariadb',
  },
  server: {
    port: 5000,
  },
};

export default developmentConfig;
