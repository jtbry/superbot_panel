const { Sequelize } = require("sequelize");
const log = require("../helpers/log");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./panel.db",
  logging: false
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    log.info("Sequelize", "Connected to Database");
  } catch(err) {
    log.fatal("Sequelize", "Unable to connect to Database", err);
  }
}

testConnection();
module.exports = sequelize;
