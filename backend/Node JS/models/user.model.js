const { DataTypes, sequelize } = require("sequelize");

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      f_name: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      l_name: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      phone: {
        allowNull: true,
        type: DataTypes.DOUBLE,
        unique: false,
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      address: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      role: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
    },
    {
      tableName: "user",
    }
  );
  return User;
};
