const axios = require("axios");

require("dotenv").config();

exports.getPriceBySymbol = (symbol) =>
  axios.get("https://pro-api.coinmarketcap.com/v1/tools/price-conversion", {
    params: {
      symbol,
      amount: 1,
    },
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY,
    },
  });
