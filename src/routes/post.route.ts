import { replyController } from "./../controllers/reply.controller";
import { commentController } from "./../controllers/comment.controller";
import { validatePost } from "./../middlewares/validatePost.middleware";
import { postController } from "./../controllers/post.controller";
import { Router } from "express";

const router = Router();

router.get("/", postController.findAll);
router.post("/", validatePost, postController.create);
router.get("/:id", postController.findOne);
router.put("/:id", validatePost, postController.update);
router.delete("/:id", postController.delete);

// routes for post comments
router.get("/:postId/comments", commentController.findAll);
router.post("/:postId/comments", validatePost, commentController.create);
router.get("/:postId/comments/:id", commentController.findOne);
router.put("/:postId/comments/:id", validatePost, commentController.update);
router.delete("/:postId/comments/:id", commentController.delete);

// routes for comments replies
router.get("/:postId/comments/:commentId/replies", replyController.findAll);
router.post("/:postId/comments/:commentId/replies", validatePost, replyController.create);
router.get("/:postId/comments/:commentId/replies/:id", replyController.findOne);
router.put("/:postId/comments/:commentId/replies/:id", validatePost, replyController.update);
router.delete("/:postId/comments/:commentId/replies/:id", replyController.delete);

export default router;
