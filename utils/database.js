const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-internship", "root", "1204", {
//   host: "localhost",
  dialect: "sqlite",
  storage: "./db.sqlite",
});

module.exports = sequelize;
