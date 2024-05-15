const dbCofig = require("../config/db.config.js");

var Sequelize = require("sequelize");
const vendorModel = require("./vendor.model.js");
const vendorProductModel = require("./vendorProduct.model.js");
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
db.requestedItems = require("./requestedItem.model.js")(Sequelize, Sequelize);
db.stock = require("./stock.model.js")(Sequelize, Sequelize);
db.vendorInvoice = require("./vendorInvoice.model.js")(Sequelize, Sequelize);


//user
db.user = require("./user.model.js")(Sequelize, Sequelize);
db.invitation = require("./invitation.model.js")(Sequelize, Sequelize);

//relationships
db.vendor.hasMany(db.vendorProduct, { foreignKey: 'id', as: 'vendorProduct', onDelete: 'RESTRICT' });
db.vendorProduct.belongsTo(db.vendor, { foreignKey: 'vendor_id', as: 'vendor', onDelete: 'RESTRICT' });

module.exports = db;

db.Sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync db.");
});