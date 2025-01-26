import { APP_CONFIG } from './src/constants/config.constants.ts';

const dbConfig = APP_CONFIG.database;

export default {
  type: dbConfig.dialect,
  host: dbConfig.host,
  port: 3306,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: APP_CONFIG.env.nodeEnv === 'development',
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
