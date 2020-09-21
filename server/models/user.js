const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class User extends Model {}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: DataTypes.TEXT,
  password: DataTypes.TEXT
}, {sequelize, timestamps: false, tableName: 'Users'});

module.exports = User;