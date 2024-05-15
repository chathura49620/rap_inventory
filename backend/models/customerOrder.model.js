const { DataTypes } = require('sequelize')

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const CustomerOrder =  sequelize.define('customerOrder', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		customer_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		order_status: {
			allowNull: true,
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		timestamp: {
			allowNull: true,
			type: DataTypes.DATE,
			unique: false
		},
	}, {
		tableName: 'customer_order'
	});
	return CustomerOrder;
};