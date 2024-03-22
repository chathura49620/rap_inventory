const { DataTypes } = require('sequelize')

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Customer =  sequelize.define('customers', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		first_name: {
			type: DataTypes.UUID,
			defaultValue: sequelize.UUIDV4, // Or Sequelize.UUIDV1
			unique: true
		},
		last_name: {
			type: DataTypes.UUID,
			defaultValue: sequelize.UUIDV4, // Or Sequelize.UUIDV1
			unique: true
		},
		billing_address: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		shipping_address: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		email: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
	}, {
		tableName: 'customers'
	});
	return Customer;
};