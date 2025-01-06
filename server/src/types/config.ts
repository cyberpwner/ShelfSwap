import { DatabaseType } from 'typeorm';

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: DatabaseType;
}

export interface ServerConfig {
  port: number;
}

export interface AppConfig {
  database: DBConfig;
  server: ServerConfig;
}
