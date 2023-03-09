import { Types } from "mongoose";
import Reply from "../models/reply.model";
import { commentService } from "./comment.service";

class ReplyService {
  async findOne(commentId: Types.ObjectId, replyId: Types.ObjectId) {
    return Reply.findById(replyId)
      .where("isDeleted")
      .equals(false)
      .where("comment")
      .equals(commentId)
      .lean();
  }

  async findAll(commentId: Types.ObjectId) {
    return Reply.find({})
      .where("isDeleted")
      .equals(false)
      .where("comment")
      .equals(commentId)
      .sort({ createdAt: "desc" })
      .lean();
  }

  async createReply(
    userId: Types.ObjectId,
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    newReply: string
  ) {
    const commentExist = await commentService.findOne(postId, commentId);

    if (!commentExist)
      throw new Error("Cannot reply to a comment that doesn't exist");

    return Reply.create({
      content: newReply,
      user: userId,
      comment: commentId,
    });
  }

  async updateReply(
    replyId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
    newReply: string
  ) {
    const replyExist: any = await this.findOne(commentId, replyId);
    const replyUser = new Types.ObjectId(replyExist.user);

    if (!replyExist) throw new Error("Reply does not exist");

    if (!(replyUser == userId))
      throw new Error("You can only edit your own reply");

    return Reply.findByIdAndUpdate(replyId, { content: newReply });
  }

  async deleteReply(
    replyId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ) {
    const replyExist: any = await this.findOne(commentId, replyId);
    const replyUser = new Types.ObjectId(replyExist.user);

    if (!replyExist) throw new Error("Reply does not exist");

    if (!(replyUser == userId))
      throw new Error("You can only delete your own reply");

    return Reply.findByIdAndUpdate(replyId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export const replyService = new ReplyService();
