import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config/database"; // Adjust the path as needed

const basename = path.basename(__filename);
const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associate models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
