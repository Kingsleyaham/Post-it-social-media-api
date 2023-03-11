import { requireAuth } from "./../middlewares/auth.middleware";
import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import postRoute from "./post.route";
import docRoute from "./doc.route";
import { validateUser } from "../middlewares/validateUser.middleware";

const router = Router();

router.use("/auth", validateUser, authRoute);
router.use("/users", requireAuth, userRoute);
router.use("/posts", requireAuth, postRoute);
router.use("/docs", docRoute);

export default router;
