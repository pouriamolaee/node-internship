const Coin = require("../models/coin");

exports.getAllCoins = (req, res, next) => {
  res.status(200).json({
    message: "Successfully retrieved",
    ...req.paginatedResult,
  });
};

exports.getPriceStatus = (req, res, next) => {
  Coin.findOne()
    .then(({ priceUpdatedAt }) => {
      const secondsFromLastUpdate =
        (Date.now() - new Date(priceUpdatedAt).getTime()) / 1000;
      const status = secondsFromLastUpdate <= 15 ? "fresh" : "stale";
      res.status(200).json({
        message: "Successfully retrieved status",
        status,
      });
    })
    .catch(console.log);
};

exports.getSingleCoin = (req, res, next) => {
  const { id } = req.params;
  Coin.findByPk(id)
    .then((coin) => {
      if (coin)
        res.status(200).json({ message: "Successfully retrieved", coin });
      else res.status(404).json({ message: "Resource not found" });
    })
    .catch(console.log);
};

exports.createCoin = (req, res, next) => {
  const addedCoin = req.body;

  Coin.findOne({ where: { symbol: addedCoin.symbol } }).then((coin) => {
    if (coin)
      return res
        .status(409)
        .json({ message: "This symbol of the coin already exists" });
  });

  Coin.create(addedCoin)
    .then((newCoin) =>
      res.status(201).json({ message: "Successfully created", newCoin })
    )
    .catch(console.log);
};

exports.updateCoin = (req, res, next) => {
  const { id } = req.params;
  Coin.update(req.body, { where: { id } })
    .then((foundItemsNumberArr) => {
      if (!foundItemsNumberArr[0])
        return res.status(404).json({ message: "Resource not found" });
      res.status(200).json({ message: "Successfully updated" });
    })
    .catch(console.log);
};

exports.deleteCoin = (req, res, next) => {
  const { id } = req.params;
  Coin.destroy({
    where: {
      id,
    },
  })
    .then((foundItemsNumber) => {
      if (!foundItemsNumber)
        return res.status(404).json({ message: "Resource not found" });
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch(console.log);
};
