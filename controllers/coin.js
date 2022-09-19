const Coin = require("../models/coin");

exports.getAllCoins = (req, res, next) => {
  Coin.findAll()
    .then((coins) =>
      res.status(200).json({ message: "Successfully retrieved", coins })
    )
    .catch(console.log);
};

exports.getSingleCoin = (req, res, next) => {
  const { coinId } = req.params;
  Coin.findByPk(coinId)
    .then((coin) => {
      if (coin)
        res.status(200).json({ message: "Successfully retrieved", coin });
      else res.status(404).json({ message: "Resource not found" });
    })
    .catch(console.log);
};

// Test Sample: { "name": "Cardano", "symbol": "ADA", "price": 0.47 }
exports.createCoin = (req, res, next) => {
  Coin.create(req.body)
    .then((newCoin) =>
      res.status(201).json({ message: "Successfully created", newCoin })
    )
    .catch(console.log);
};

exports.updateCoin = (req, res, next) => {
  const { id: updatedCoinId, ...updatedCoin } = req.body;
  Coin.update(updatedCoin, { where: { id: updatedCoinId } })
    .then(() => res.status(200).json({ message: "Successfully updated" }))
    .catch(console.log);
};

exports.deleteCoin = (req, res, next) => {
  const coinId = req.body.id;
  Coin.destroy({
    where: {
      id: coinId,
    },
  })
    .then(() => res.status(200).json({ message: "Successfully deleted" }))
    .catch(console.log);
};
