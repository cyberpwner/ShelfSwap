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
};

export default productionConfig;
