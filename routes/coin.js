const router = require("express").Router();
const coinController = require("../controllers/coin");
const paginatedResults = require("../middlewares/pagination");
const Coin = require("../models/coin");

/**
 * @swagger
 * /coins:
 *  get:
 *      description: Use to fetch all coins
 *      tags: [Coins]
 *      parameters:
 *        - name: page
 *          in: query
 *        - name: limit
 *          in: query
 *      responses:
 *       '200':
 *          description: A successful response
 */
router.get("/coins", paginatedResults(Coin), coinController.getAllCoins);

/**
 * @swagger
 * /coins/price-status:
 *  get:
 *      description: Use to learn about coins' price status
 *      tags: [Coins]
 *      responses:
 *       '200':
 *          description: A successful response
 */
router.get("/coins/price-status", coinController.getPriceStatus);

/**
 * @swagger
 * /coin/{id}:
 *  get:
 *      description: Use to fetch a single coin
 *      tags: [Coins]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: integer
 *          description: The coin id
 *          example: 1
 *      responses:getPriceStatus
 *       '200':
 *          description: A successful response
      console.log(secondsFromLastUpdate);
 *       '404':
 *          description: Resource not found
 */
router.get("/coin/:id", coinController.getSingleCoin);

module.exports = router;
