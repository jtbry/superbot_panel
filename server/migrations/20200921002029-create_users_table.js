'use strict';
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: DataTypes.TEXT,
      password: DataTypes.TEXT
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('Users');
  }
};
