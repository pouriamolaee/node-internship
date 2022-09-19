const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const coinRoutes = require("./routes/coin");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyParser.json());

app.use(coinRoutes);
app.use("/admin", adminRoutes);

sequelize
  .sync()
  .then(() => app.listen("8080"))
  .catch(console.log);
