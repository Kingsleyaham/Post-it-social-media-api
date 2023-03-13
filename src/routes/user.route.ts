import { validateUser } from "../middlewares/validateUser.middleware";
import { userController } from "./../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findUser);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
