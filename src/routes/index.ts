import { requireAuth } from "./../middlewares/auth.middleware";
import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import { validateUser } from "../middlewares/validation.middleware";

const router = Router();

router.use("/users", userRoute);
// router.use("/users", requireAuth, userRoute);
router.use("/auth", validateUser, authRoute);

export default router;
