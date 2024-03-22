const { DataTypes } = require('sequelize')

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const orderItem =  sequelize.define('orderItem', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		timestamp: {
			allowNull: true,
			type: DataTypes.DATE,
			unique: false
		},
        description: {
			allowNull: true,
			type: DataTypes.STRING,
			unique: false
		},
        variation: {
			allowNull: true,
			type: DataTypes.STRING,
			unique: false
		},
        quantity: {
			allowNull: true,
			type: DataTypes.INTEGER,
			unique: false
		},
        price: {
			allowNull: true,
			type: DataTypes.DECIMAL,
			unique: false
		},
	}, {
		tableName: 'order_items'
	});
	return orderItem;
};