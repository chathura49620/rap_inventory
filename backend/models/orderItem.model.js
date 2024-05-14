const { DataTypes } = require('sequelize')

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const orderItem = sequelize.define('orderItem', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		order_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		stock_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		quantity: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		customer_id: {
			allowNull: true,
			type: DataTypes.INTEGER
		},
	}, {
		tableName: 'order_items'
	});
	return orderItem;
};