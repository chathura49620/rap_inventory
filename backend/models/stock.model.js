const { DataTypes, sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Stock =  sequelize.define('stock', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
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
        quantity: {
			allowNull: true,
			type: DataTypes.INTEGER,
			unique: false
		},
        price: {
			allowNull: true,
			type: DataTypes.DOUBLE,
			unique: false
		},
        supplier_id: {
			allowNull: true,
			type: DataTypes.INTEGER,
			unique: false
		},
	}, {
		tableName: 'stock'
	});
	return Stock;
};