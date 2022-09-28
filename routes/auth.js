const router = require("express").Router();
const authController = require("../controllers/auth");

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: The auto-generated id of the user.
 *          username:
 *            type: string
 *            description: The username of your user.
 *          password:
 *            type: string
 *            description: The password of the user.
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date of the record creation.
 *        example:
 *           username: nez
 *           password: p12041204
 */

/**
 * @swagger
 *   tags:
 *     name: Auth
 *     description: API to manage authentication.
 */

/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *      description: Use to register a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *       '201':
 *          description: Resource created successfully
 *       '400':
 *          description: Bad request
 *       '409':
 *          description: Already exists
 */
router.post("/sign-up", authController.signUp);

/**
 * @swagger
 * /auth/sign-in:
 *  post:
 *      description: Use to sign up a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *       '200':
 *          description: Successfully logged in
 *       '400':
 *          description: Invalid input
 *       '401':
 *          description: Invalid credentials
 */
router.post("/sign-in", authController.signIn);

/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *      description: Use to refresh the token
 *      tags: [Auth]
 *      responses:
 *       '200':
 *          description: Successfully logged in
 *       '400':
 *          description: No refreshToken provided
 */
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
