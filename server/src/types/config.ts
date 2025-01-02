import { Dialect } from 'sequelize';

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
}

export interface ServerConfig {
  port: number;
}

export interface AppConfig {
  database: DBConfig;
  server: ServerConfig;
}
