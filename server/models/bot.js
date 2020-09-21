const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

class Bot extends Model {}

Bot.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  code: DataTypes.TEXT,
  name: DataTypes.TEXT,
  last_ip: DataTypes.TEXT,
  last_online: DataTypes.INTEGER,
  is_online: DataTypes.INTEGER
}, {sequelize, timestamps: false, tableName: 'Bots'});

module.exports = Bot;