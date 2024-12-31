import dotenv from "dotenv";
import { AppConfig } from "../src/types/config";

dotenv.config();

const productionConfig: AppConfig = {
  database: {
    username: "produser",
    password: "prodpass",
    database: "proddb",
    host: "prod-db-host",
    dialect: "mysql",
  },
  server: {
    port: 1234,
  },
};

export default productionConfig;
