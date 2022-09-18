const coinController = require("../controllers/coin");

const router = require("express").Router();

router.get("/coins", coinController.getAllCoins);

module.exports = router;
