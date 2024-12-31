import path from "path";

export default {
  config: path.resolve("config", "database.ts"),
  "models-path": path.resolve("src", "models"),
  "seeders-path": path.resolve("src", "seeders"),
  "migrations-path": path.resolve("src", "migrations"),
};
