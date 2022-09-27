const Coin = require("../models/coin");

exports.getAllCoins = (req, res, next) => {
  Coin.findAll()
    .then((coins) =>
      res.status(200).json({ message: "Successfully retrieved", coins })
    )
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
  Coin.create(req.body)
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
