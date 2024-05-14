const { DataTypes, Sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
    const requestedItems =  sequelize.define('requestedItems', {
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
		vendor_id: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		quntity: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
		request_status: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
		delivery_status: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
        delivery_date: {
			allowNull: false,
			type: DataTypes.STRING(200),
			unique: false
		},
	}, {
		tableName: 'requestedItems'
	});
	return requestedItems;
};