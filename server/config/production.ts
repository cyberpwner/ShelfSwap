import dotenv from 'dotenv';

dotenv.config();

const productionConfig = {
  database: {
    username: 'DB_USER',
    password: 'DB_PASSWORD',
    database: 'DB_NAME',
    host: 'DB_HOST',
    dialect: 'DB_DIALECT',
  },
  server: {
    port: 'SERVER_PORT',
  },
  bcrypt: {
    saltRounds: 'SALT_ROUNDS',
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
  cloudinary: {
    cloud_name: 'CLOUDINARY_CLOUD_NAME',
    api_key: 'CLOUDINARY_API_KEY',
    api_secret: 'CLOUDINARY_API_SECRET',
  },
};

export default productionConfig;
