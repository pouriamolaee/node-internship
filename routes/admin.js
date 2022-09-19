const router = require("express").Router();
const coinController = require("../controllers/coin");

router.post("/createCoin", coinController.createCoin);
router.patch("/updateCoin", coinController.updateCoin);
router.delete("/deleteCoin", coinController.deleteCoin);

module.exports = router;
