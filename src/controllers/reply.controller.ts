import { ICreatePost } from "./../interfaces/createPost.interface";
import { replyService } from "./../services/reply.service";
import { Response } from "express";
import { Types } from "mongoose";
import { RequestWithUser } from "./../interfaces/request.interface";
class ReplyController {
  /** Fetch all replies of a comment from database sorted by newest first  */
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const commentId = new Types.ObjectId(req.params.commentId);

      const replies = await replyService.findAll(commentId);

      res.status(200).json({ success: true, results: replies });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Creates a new reply and stores it in database along with the user that created the reply and the comment id*/
  async create(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const postId = new Types.ObjectId(req.params.postId);
      const commentId = new Types.ObjectId(req.params.commentId);
      const reqBody: ICreatePost = req.body;

      const reply = await replyService.createReply(
        userId,
        postId,
        commentId,
        reqBody.content
      );

      return res.status(201).json({ success: true, reply });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Fetch a single reply from database using reply id*/
  async findOne(req: RequestWithUser, res: Response) {
    try {
      const replyId = new Types.ObjectId(req.params.id);
      const commentId = new Types.ObjectId(req.params.commentId);

      const reply = await replyService.findOne(commentId, replyId);

      if (reply) return res.status(200).json({ success: true, result: reply });

      return res
        .status(404)
        .json({ success: false, message: "reply not found" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Updates a reply in database using reply id. A reply can only be edited by the owner */
  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const commentId = new Types.ObjectId(req.params.commentId);
      const replyId = new Types.ObjectId(req.params.id);
      const reqBody: ICreatePost = req.body;

      await replyService.updateReply(
        replyId,
        commentId,
        userId,
        reqBody.content
      );

      return res.status(201).json({
        success: true,
        message: "reply updated successfully",
      });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Delete user reply in database using reply id. A reply can only be deleted by the owner */
  async delete(req: RequestWithUser, res: Response) {
    try {
      const replyId = new Types.ObjectId(req.params.id);
      const commentId = new Types.ObjectId(req.params.commentId);
      const userId = req.user.sub;

      await replyService.deleteReply(replyId, commentId, userId);

      return res.status(200).json({
        success: true,
        message: "reply deleted successfully",
      });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const replyController = new ReplyController();
