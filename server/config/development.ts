import dotenv from "dotenv";
import { AppConfig } from "../src/types/config";
import { Dialect } from "sequelize";

dotenv.config();

const developmentConfig: AppConfig = {
  database: {
    username: "test",
    password: "test",
    database: "test",
    host: "test",
    dialect: "mariadb",
  },
  server: {
    port: 5000,
  },
};

export default developmentConfig;
