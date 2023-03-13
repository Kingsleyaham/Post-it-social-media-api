import { parseId } from "./../utils/parseId";
import { MESSAGES } from "./../constants";
import { ICreatePost } from "./../interfaces/createPost.interface";
import { Response } from "express";
import { RequestWithUser } from "../interfaces/request.interface";
import { commentService } from "../services/comment.service";

class CommentController {
  /** Fetch all comments of a post from database sorted by newest first  */
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const postId = parseId(req.params.postId);

      const comments = await commentService.findAll(postId);

      return res.status(200).json({ success: true, comments });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Creates a new comment and stores it in database along with the user that created the post and the post id*/
  async create(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const reqBody: ICreatePost = req.body;
      const postId = parseId(req.params.postId);

      await commentService.createComment(userId, postId, reqBody.content);

      return res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Fetch a single comment from database using comment id*/
  async findOne(req: RequestWithUser, res: Response) {
    try {
      const commentId = parseId(req.params.id);
      const postId = parseId(req.params.postId);

      const comment = await commentService.findOne(postId, commentId);

      if (!comment) throw new Error("comment not found");

      return res.status(200).json({ success: true, comment });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Updates comment in database using comment id. A comment can only be edited by the owner */
  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const commentId = parseId(req.params.id);
      const postId = parseId(req.params.postId);
      const reqBody: ICreatePost = req.body;

      await commentService.updateComment(
        postId,
        commentId,
        userId,
        reqBody.content
      );

      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Delete a single comment using comment id. A comment can only be deleted by the owner */
  async delete(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const commentId = parseId(req.params.id);
      const postId = parseId(req.params.postId);

      await commentService.deleteComment(postId, commentId, userId);

      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const commentController = new CommentController();
