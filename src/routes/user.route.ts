import { validateUser } from "../middlewares/validateUser.middleware";
import { userController } from "./../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.get("/", userController.findAll);
router.get("/:id", userController.findUser);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

// routes for fetching posts and comments using userId or @username
router.get("/:userId/posts", userController.findPostsByUser);
router.get("/:userId/posts/:id", userController.findOnePostByUser);
router.get(
  "/:userId/posts/:postId/comments",
  userController.findCommentsByUser
);
router.get(
  "/:userId/posts/:postId/comments/:id",
  userController.findOneCommentByUser
);

export default router;
