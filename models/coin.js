const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Coin = sequelize.define("coin", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  priceUpdatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
    field: "price_updated_at",
  },
});

module.exports = Coin;
