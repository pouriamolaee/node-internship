const router = require("express").Router();
const coinController = require("../controllers/coin");

/**
 * @swagger
 * /admin/createCoin:
 *  post:
 *      description: Use to create a coin
 *      responses:
 *       '201':
 *          description: Resource created successfully
 */
router.post("/createCoin", coinController.createCoin);

/**
 * @swagger
 * /admin/updateCoin:
 *  patch:
 *      description: Use to update a coin
 *      responses:
 *       '200':
 *          description: Resource updated successfully
 */
router.patch("/updateCoin", coinController.updateCoin);

/**
 * @swagger
 * /admin/deleteCoin:
 *  delete:
 *      description: Use to delete a coin
 *      responses:
 *       '200':
 *          description: Resource deleted successfully
 */
router.delete("/deleteCoin", coinController.deleteCoin);

module.exports = router;
