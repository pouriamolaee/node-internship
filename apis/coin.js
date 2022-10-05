const axios = require("axios");

exports.getPriceBySymbol = (symbol) =>
  axios.get("https://pro-api.coinmarketcap.com/v1/tools/price-conversion", {
    params: {
      symbol,
      amount: 1,
    },
    headers: {
      "X-CMC_PRO_API_KEY": "45565e33-4d88-4cb4-8fb6-dca0a3caaabf",
    },
  });
