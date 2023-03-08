import { validatePost } from "./../middlewares/validatePost.middleware";
import { postController } from "./../controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get("/", postController.findAll);
router.post("/", validatePost, postController.create);
router.get("/:id", postController.findOne);
router.put("/:id", validatePost, postController.update);
router.patch("/:id", postController.delete);

export default router;
