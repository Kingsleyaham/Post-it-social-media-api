import { ICreatePost } from "./../interfaces/createPost.interface";
import { Response } from "express";
import { Types } from "mongoose";
import { RequestWithUser } from "../interfaces/request.interface";
import { commentService } from "../services/comment.service";

class CommentController {
  /** Fetch all comments of a post from database sorted by newest first  */
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const postId = new Types.ObjectId(req.params.postId);
      const comments = await commentService.findAll(postId);

      return res.status(200).json({ success: true, comments });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Creates a new comment and stores it in database along with the user that created the post and the post id*/
  async create(req: RequestWithUser, res: Response) {
    const userId = req.user.sub;
    const reqBody: ICreatePost = req.body;

    try {
      const postId = new Types.ObjectId(req.params.postId);
      const comment = await commentService.createComment(
        userId,
        postId,
        reqBody.content
      );

      return res.status(201).json({ success: true, comment });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Fetch a single comment from database using comment id*/
  async findOne(req: RequestWithUser, res: Response) {
    try {
      const commentId = new Types.ObjectId(req.params.id);
      const postId = new Types.ObjectId(req.params.postId);

      const comment = await commentService.findOne(postId, commentId);
      if (comment) {
        return res.status(200).json({ success: true, comment });
      }

      return res
        .status(404)
        .json({ success: false, message: "comment not found" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Updates comment in database using comment id. A comment can only be edited by the owner */
  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const commentId = new Types.ObjectId(req.params.id);
      const postId = new Types.ObjectId(req.params.postId);
      const reqBody: ICreatePost = req.body;

      await commentService.updateComment(
        postId,
        commentId,
        userId,
        reqBody.content
      );

      return res.status(201).json({
        success: true,
        message: "Comment updated successfully",
      });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Delete a single comment using comment id. A comment can only be deleted by the owner */
  async delete(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const commentId = new Types.ObjectId(req.params.id);
      const postId = new Types.ObjectId(req.params.postId);

      await commentService.deleteComment(postId, commentId, userId);

      return res
        .status(200)
        .json({ success: true, message: "Comment deleted successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const commentController = new CommentController();
