export default {
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
    nodeEnv: 'NODE_ENV',
  },
};
