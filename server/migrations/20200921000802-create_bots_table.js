'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Bots', {
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Bots');
  }
};
