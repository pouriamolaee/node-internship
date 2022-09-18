const router = require("express").Router();
const coinController = require("../controllers/coin");

router.get("/coins", coinController.getAllCoins);

module.exports = router;
