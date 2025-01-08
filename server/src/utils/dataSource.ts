import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import { AppConfig } from '../types/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbConfig = config.get<AppConfig['database']>('database');

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: dbConfig.host,
  port: 3306,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  // typeorm will make table and column names snake_case even if the attribute is declared in camelCase in the entity class
  // Which is nice cause you can have consistency in both your classes and your db. The library is 'typeorm-naming-strategies' :)
  namingStrategy: new SnakeNamingStrategy(),
});
