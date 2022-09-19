const router = require("express").Router();
const coinController = require("../controllers/coin");

/**
 * @swagger
 * /coins:
 *  get:
 *      description: Use to fetch all coins
 *      responses:
 *       '200':
 *          description: A successful response
 */
router.get("/coins", coinController.getAllCoins);

/**
 * @swagger
 * /coin/:coinId:
 *  get:
 *      description: Use to fetch a single coin
 *      responses:
 *       '200':
 *          description: A successful response
 *       '204':
 *          description: Resource not found
 */
router.get("/coin/:coinId", coinController.getSingleCoin);

module.exports = router;
