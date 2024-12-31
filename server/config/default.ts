import dotenv from "dotenv";
import { AppConfig } from "../src/types/config.js";

dotenv.config();

const config: AppConfig = {
  database: {
    username: "root",
    password: "",
    database: "defaultDb",
    host: "localhost",
    dialect: "mysql",
  },
  server: {
    port: 3306,
  },
};

export default config;
