const dbCofig = require("../config/db.config.js");

var Sequelize = require("sequelize");
const vendorModel = require("./vendor.model.js");
const vendorProductModel = require("./vendorProduct.model.js");
const customerModel = require("./customer.model.js");
const customerOrderModel = require("./customerOrder.model.js");
const orderItemModel = require("./orderItem.model.js");
const stockViewModel = require("./stockView.model.js");

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
//customer
db.customer = require("./customer.model.js")(Sequelize, Sequelize);
db.customerOrder = require("./customerOrder.model.js")(Sequelize, Sequelize);
db.orderItem = require("./orderItem.model.js")(Sequelize, Sequelize);
// db.stockView = require("./stockView.model.js")(Sequelize, Sequelize);

//relationships
// db.vendor.hasMany(db.vendorProduct, { foreignKey: 'id', as: 'vendorProduct', onDelete: 'RESTRICT' });
// db.vendorProduct.belongsTo(db.vendor, { foreignKey: 'vendor_id', as: 'vendor', onDelete: 'RESTRICT' });

db.customer.hasMany(db.customerOrder, { foreignKey: 'customer_id', as: 'customerOrder', onDelete: 'RESTRICT' });
db.customerOrder.belongsTo(db.customer, { foreignKey: 'customer_id', as: 'customer', onDelete: 'RESTRICT' });

db.customer.hasMany(db.orderItem, { foreignKey: 'customer_id', as: 'orderItem', onDelete: 'RESTRICT' });
db.orderItem.belongsTo(db.customer, { foreignKey: 'customer_id', as: 'customer', onDelete: 'RESTRICT' });

db.customerOrder.hasMany(db.orderItem, { foreignKey: 'order_id', as: 'orderItem', onDelete: 'RESTRICT' });
db.orderItem.belongsTo(db.customerOrder, { foreignKey: 'order_id', as: 'customerOrders', onDelete: 'RESTRICT' });

db.stock.hasOne(db.orderItem, { foreignKey: 'stock_id', as: 'orderItem', onDelete: 'RESTRICT' });
db.orderItem.belongsTo(db.stock, { foreignKey: 'stock_id', as: 'stockItem', onDelete: 'RESTRICT' });

module.exports = db;

db.Sequelize.sync({ force: false }).then(() => {
  console.log("Drop and resync db.");
});
