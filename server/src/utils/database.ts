import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import { AppConfig } from "../types/config.js";

console.log(`Environment: ${process.env.NODE_ENV}`);

// Load the database configuration
const dbConfig = config.get<AppConfig["database"]>("database");
const serverConfig = config.get<AppConfig["server"]>("server");

console.log("DB:", dbConfig);
console.log("SERVER:", serverConfig);

// Ensure all required configuration values are defined
if (
  !dbConfig.username ||
  !dbConfig.password ||
  !dbConfig.database ||
  !dbConfig.host
) {
  throw new Error("Missing database configuration");
}

// Create the Sequelize instance
const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  logging: false,
});

export default sequelize;
