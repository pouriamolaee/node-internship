const router = require("express").Router();
const coinController = require("../controllers/coin");

router.get("/coins", coinController.getAllCoins);
router.get("/coin/:coinId", coinController.getSingleCoin);


module.exports = router;
