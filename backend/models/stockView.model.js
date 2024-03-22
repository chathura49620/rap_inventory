const { DataTypes } = require('sequelize')

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const stock =  sequelize.define('stocks', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			type: DataTypes.STRING(200),
			unique: false
		},
		brand: {
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
			allowNull: false,
			type: DataTypes.INTEGER
		},
    price: {
			allowNull: false,
			type: DataTypes.DECIMAL
		},
    supplier_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
	}, {
		tableName: 'Stocks'
	});
	return stock;
};