import { authController } from "./../controllers/auth.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          required:
 *              - email
 *              -  password
 */

router.post("/login", authController.login);
router.post("/signup", authController.signup);

export default router;
