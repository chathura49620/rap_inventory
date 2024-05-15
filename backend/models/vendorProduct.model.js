const { DataTypes, Sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    const vendorProduct =  sequelize.define('vendorProduct', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		product_id: {
			type: DataTypes.STRING(200),
			
		},
		product_name: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		description: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
		price: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
		vendor_id:{
			type: DataTypes.STRING(200),
		}
	}, {
		tableName: 'vendor_product'
	});
	return vendorProduct;
};