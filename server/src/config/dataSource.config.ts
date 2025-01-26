import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { APP_CONFIG } from '../constants/config.constants';

const dbConfig = APP_CONFIG.database;

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: dbConfig.host,
  port: 3306,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: APP_CONFIG.env.nodeEnv === 'development',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  // typeorm will make table and column names snake_case even if the attribute is declared in camelCase in the entity class
  namingStrategy: new SnakeNamingStrategy(),
});
