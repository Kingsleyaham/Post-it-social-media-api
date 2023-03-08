import { validateUser } from "./../middlewares/validation.middleware";
import { userController } from "./../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findUser);
router.put("/:id", validateUser, userController.updateUser);
router.patch("/:id", userController.deleteUser);

export default router;
