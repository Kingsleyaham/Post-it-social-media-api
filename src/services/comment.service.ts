import { Types } from "mongoose";
import Comment from "../models/comment.model";

class CommentService {
  async findOne(postId: Types.ObjectId, commentId: Types.ObjectId) {
    return Comment.findById(commentId)
      .where("isDeleted")
      .equals(false)
      .where("post")
      .equals(postId)
      .lean();
  }

  async findAll(postId: Types.ObjectId) {
    return Comment.find({})
      .where("isDeleted")
      .equals(false)
      .where("post")
      .equals(postId)
      .sort({ createdAt: "desc" })
      .lean();
  }

  async createComment(
    userId: Types.ObjectId,
    postId: Types.ObjectId,
    newComment: string
  ) {
    return Comment.create({
      content: newComment,
      user: userId,
      post: postId,
    });
  }

  async updateComment(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
    newComment: string
  ) {
    const commentExist = await this.findOne(postId, commentId);
    const commentUser = commentExist.user;

    if (!commentExist) throw new Error("comment not found");

    if (!(commentUser == userId))
      throw new Error("You can only edit your own comment");

    return Comment.findByIdAndUpdate(commentId, { content: newComment });
  }

  async deleteComment(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ) {
    const commentExist = await this.findOne(postId, commentId);
    const commentUser = commentExist.user;

    if (!commentExist) throw new Error("comment not found");

    if (!(commentUser == userId))
      throw new Error("You can only delete your own comment");

    return Comment.findByIdAndUpdate(commentId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export const commentService = new CommentService();
