const cron = require("node-cron");
const Coin = require("../models/coin");
const coinAPIs = require("../apis/coin");

exports.updateCoinsPrice = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const coins = await Coin.findAll();
      coins.forEach(async ({ symbol }) => {
        const { price } = (await coinAPIs.getPriceBySymbol(symbol)).data.data
          .quote.USD;
        const foundItemsNumberArr = await Coin.update(
          { price },
          { where: { symbol } }
        );
        if (!foundItemsNumberArr[0]) throw new Error("Resource not found");
      });
    } catch (err) {
      console.error(err);
    }
  });
};
