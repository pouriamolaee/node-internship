const cron = require("node-cron");
const Coin = require("../models/coin");
const coinAPIs = require("../apis/coin");
const { getIO } = require("../clients/socket");

exports.updateCoinsPrice = () => {
  cron.schedule("*/30 * * * * *", async () => {
    try {
      const coins = await Coin.findAll();

      const priceUpdatedAt = new Date(Date.now());

      const socketResponse = { data: {}, meta: { updatedAt: priceUpdatedAt } };

      new Promise((resolve, reject) => {
        coins.forEach(async ({ symbol }, index) => {
          const { price } = (await coinAPIs.getPriceBySymbol(symbol)).data.data
            .quote.USD;

          socketResponse.data[symbol] = price;

          const foundItemsNumberArr = await Coin.update(
            { price, priceUpdatedAt },
            { where: { symbol } }
          );
          if (!foundItemsNumberArr[0]) throw new Error("Resource not found");

          if (index === coins.length - 1) resolve();
        });
      }).then(() => getIO().emit("prices", socketResponse));
    } catch (err) {
      console.error(err);
    }
  });
};
