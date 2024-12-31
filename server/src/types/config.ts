import { Dialect } from "sequelize";

export type DBConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
};

export type ServerConfig = {
  port: number;
};

export type AppConfig = {
  database: DBConfig;
  server: ServerConfig;
};
