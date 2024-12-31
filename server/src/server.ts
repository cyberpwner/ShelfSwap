import dotenv from "dotenv";
dotenv.config();
import config from "config";
import app from "./app.js";
import { AppConfig } from "./types/config.js";

const ServerConfig = config.get<AppConfig["server"]>("server");

app.listen(ServerConfig.port, () => {
  console.log(`Server running on port ${ServerConfig.port}`);
});
