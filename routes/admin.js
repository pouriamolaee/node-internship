const router = require("express").Router();
const coinController = require("../controllers/coin");

/**
 * @swagger
 *  components:
 *    schemas:
 *      Coin:
 *        type: object
 *        required:
 *          - name
 *          - symbol
 *          - price
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the coin.
 *          name:
 *            type: string
 *            description: The name of your coin.
 *          symbol:
 *            type: string
 *            description: The unique symbol of the coin.
 *          price:
 *            type: double
 *            description: The price and value of the coin.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           name: Bitcoin
 *           symbol: BTC
 *           price: 19669.4
 */

/**
 * @swagger
 *   tags:
 *     name: Coins
 *     description: API to manage the coins.
 */

/**
 * @swagger
 * /admin/createCoin:
 *  post:
 *      description: Use to create a coin
 *      tags: [Coins]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coin'
 *      responses:
 *       '201':
 *          description: Resource created successfully
 */
router.post("/createCoin/", coinController.createCoin);

/**
 * @swagger
 * /admin/updateCoin/{id}:
 *  patch:
 *      description: Use to update a coin
 *      tags: [Coins]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: integer
 *          description: The coin id
 *          example: 2
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Coin'
 *      responses:
 *       '200':
 *          description: Resource updated successfully
 *       '404':
 *          description: Resource not found
 */
router.patch("/updateCoin/:id", coinController.updateCoin);

/**
 * @swagger
 * /admin/deleteCoin/{id}:
 *  delete:
 *      description: Use to delete a coin
 *      tags: [Coins]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *              type: integer
 *          description: The coin id
 *      responses:
 *       '200':
 *          description: Resource deleted successfully
 *       '404':
 *          description: Resource not found
 */
router.delete("/deleteCoin/:id", coinController.deleteCoin);

module.exports = router;
