const coins = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 19669.4 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 1380.81 },
];

exports.getAllCoins = (req, res, next) => {
  res.json(coins);
};

// Test Sample: { "name": "Cardano", "symbol": "ADA", "price": 0.47 }
exports.createCoin = (req, res, next) => {
  const newCoin = { id: coins.length + 1, ...req.body };
  coins.push(newCoin);
  res.status(201).json({ message: "Successfully created", newCoin });
};

exports.deleteCoin = (req, res, next) => {
  const deletedCoin = coins.find(({ id }) => req.body.id === id);
  const coinIdx = coins.findIndex(({ id }) => parseInt(deletedCoin.id) == id);
  coins.splice(coinIdx, 1);
  res.status(200).json({ message: "Successfully deleted", deletedCoin });
};
