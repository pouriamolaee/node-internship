const express = require("express");
const coinRoutes = require("./routes/coin");

const app = express();

app.use(coinRoutes);

app.listen("8080");
