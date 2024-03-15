const dbCofig = require("../config/db.config.js");

var Sequelize = require("sequelize");
Sequelize = new Sequelize(dbCofig.DB, dbCofig.USER, dbCofig.PASSWORD, {
  host: dbCofig.HOST,
  dialect: dbCofig.dialect,
  operationsAliases: false,
  pool: {
    max: dbCofig.pool.max,
    min: dbCofig.pool.min,
    acquire: dbCofig.pool.acquire,
    idle: dbCofig.pool.idle,
  },
});
let db = {};

db.Sequelize = Sequelize;

db.vendor = require("./vendor.model.js")(Sequelize, Sequelize);
db.vendorProduct = require("./vendorProduct.model.js")(Sequelize, Sequelize);

module.exports = db;


db.Sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db.");
});
