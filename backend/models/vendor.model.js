const { DataTypes, sequelize } = require('sequelize');

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	const Vendor =  sequelize.define('vendors', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		first_name: {
			type: DataTypes.STRING(200),
			unique: true
		},
		description: {
			allowNull: true,
			type: DataTypes.STRING(200),
			unique: false
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING(200)
		},
	}, {
		tableName: 'vendors'
	});
	return Vendor;
};