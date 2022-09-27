const router = require("express").Router();
const coinController = require("../controllers/coin");

/**
 * @swagger
 * /coins:
 *  get:
 *      description: Use to fetch all coins
 *      tags: [Coins]
 *      responses:
 *       '200':
 *          description: A successful response
 */
router.get("/coins", coinController.getAllCoins);

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
 *      responses:
 *       '200':
 *          description: A successful response
 *       '404':
 *          description: Resource not found
 */
router.get("/coin/:id", coinController.getSingleCoin);

module.exports = router;
