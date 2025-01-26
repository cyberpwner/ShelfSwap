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

export interface BcryptConfig {
  saltRounds: number;
}

export interface JWTConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiration: string;
  refreshExpiration: string;
}

export interface EnvConfig {
  nodeEnv: 'production' | 'development';
}

export interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

export interface AppConfig {
  database: DBConfig;
  server: ServerConfig;
  bcrypt: BcryptConfig;
  jwt: JWTConfig;
  env: EnvConfig;
  cloudinary: CloudinaryConfig;
}
