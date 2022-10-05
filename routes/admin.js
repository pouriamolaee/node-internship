const router = require("express").Router();
const coinController = require("../controllers/coin");

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
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
 * /admin/create-coin:
 *  post:
 *      security:
 *        - BearerAuth: []
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
 *       '409':
 *          description: This symbol of the coin already exists
 */
router.post("/create-coin/", coinController.createCoin);

/**
 * @swagger
 * /admin/update-coin/{id}:
 *  patch:
 *      security:
 *        - BearerAuth: []
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
router.patch("/update-coin/:id", coinController.updateCoin);

/**
 * @swagger
 * /admin/delete-coin/{id}:
 *  delete:
 *      security:
 *        - BearerAuth: []
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
router.delete("/delete-coin/:id", coinController.deleteCoin);

module.exports = router;
