const coins = [
  { name: "bitcoin", symbol: "BTC", price: 19669.4 },
  { name: "ethereum", symbol: "ETH", price: 1380.81 },
];

exports.getAllCoins = (req, res, next) => {
  res.json(coins);
};
