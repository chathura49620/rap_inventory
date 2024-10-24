const { DataTypes, sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Vendor =  sequelize.define('vendorInvoice', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		request_Id: {
			type: DataTypes.STRING(200),
			unique: true
		},
		total: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		invoiced_date: {
			allowNull: false,
			type: DataTypes.STRING(200)
		},
        due_date: {
			allowNull: false,
			type: DataTypes.STRING(200)
		},
        status: {
			allowNull: false,
			type: DataTypes.STRING(200)
		},
	}, {
		tableName: 'vendorInvoice'
	});
	return Vendor;
};