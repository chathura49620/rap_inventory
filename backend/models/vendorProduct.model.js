const { DataTypes, Sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const vendorProduct = sequelize.define('vendorProduct', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		product_id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
			unique: true
		},
		product_name: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		brand: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		type: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		color: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		price: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
		vendor_id: {
			allowNull: true,
			type: DataTypes.INTEGER,
			unique: false
		},
	}, {
		tableName: 'vendor_product'
	});
	return vendorProduct;
};