const { DataTypes, sequelize } = require("sequelize");

// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  const Invitation = sequelize.define(
    "invitation",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subject: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      message: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      receiver: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
      sender: {
        allowNull: true,
        type: DataTypes.STRING(200),
        unique: false,
      },
    },
    {
      tableName: "invitation",
    }
  );
  return Invitation;
};
