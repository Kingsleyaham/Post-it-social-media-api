import { isValidObjectId, Types } from "mongoose";
import Comment from "../models/comment.model";
import { parseId } from "../utils/parseId";
import { userService } from "./user.service";

class CommentService {
  /** Fetch a single comment from database using comment id */
  async findOne(postId: Types.ObjectId, commentId: Types.ObjectId) {
    return Comment.findById(commentId)
      .where("isDeleted")
      .equals(false)
      .where("post")
      .equals(postId)
      .lean();
  }

  /** Fetch all comments from database */
  async findAll(postId: Types.ObjectId) {
    return Comment.find({})
      .where("isDeleted")
      .equals(false)
      .where("post")
      .equals(postId)
      .sort({ createdAt: "desc" })
      .lean();
  }

  /** Create new comment in database */
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

  /** update a comment in database using comment id */
  async updateComment(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId,
    newComment: string
  ) {
    const commentExist: any = await this.findOne(postId, commentId);
    const commentUser = parseId(commentExist?.user);

    if (!commentExist) throw new Error("comment not found");

    if (!(commentUser == userId))
      throw new Error("You can only edit your own comment");

    return Comment.findByIdAndUpdate(commentId, { content: newComment });
  }

  /** Delete a comment in database in comment id */
  async deleteComment(
    postId: Types.ObjectId,
    commentId: Types.ObjectId,
    userId: Types.ObjectId
  ) {
    const commentExist: any = await this.findOne(postId, commentId);
    const commentUser = parseId(commentExist?.user);

    if (!commentExist) throw new Error("comment not found");

    if (!(commentUser == userId))
      throw new Error("You can only delete your own comment");

    return Comment.findByIdAndUpdate(commentId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  // Fetching comments by user i.e using user id or @username

  /** Fetch a single user comment using userId and postId */
  async findOneByUserId(
    commentId: Types.ObjectId,
    postId: Types.ObjectId,
    userId: Types.ObjectId
  ) {
    return Comment.findById(commentId)
      .where("user")
      .equals(userId)
      .where("post")
      .equals(postId)
      .where("isDeleted")
      .equals(false)
      .lean();
  }

  /** Fetch a single user comment using username and postId */
  async findOneByUsername(
    commentId: Types.ObjectId,
    postId: Types.ObjectId,
    username: string
  ) {
    const user = await userService.findByUsername(username);
    const userId = parseId(user?._id);

    return this.findOneByUserId(commentId, postId, userId);
  }

  /** Fetch a single user comment from database */
  async findOneUserComment(
    userId: any,
    postId: Types.ObjectId,
    commentId: Types.ObjectId
  ) {
    const comment = isValidObjectId(userId)
      ? await this.findOneByUserId(commentId, postId, userId)
      : await this.findOneByUsername(commentId, postId, userId);

    return comment;
  }

  /** Fetch user comments by userId and postId*/
  async findCommentsByUserId(postId: Types.ObjectId, userId: Types.ObjectId) {
    return Comment.find({})
      .where("user")
      .equals(userId)
      .where("post")
      .equals(postId)
      .where("isDeleted")
      .equals(false)
      .sort({ createdAt: "desc" })
      .lean();
  }

  /** Fetch user comments by username and postId */
  async findCommentsByUsername(postId: Types.ObjectId, username: string) {
    const user = await userService.findByUsername(username);
    const userId = parseId(user?._id);

    return this.findCommentsByUserId(postId, userId);
  }

  /** Fetch all comments of a particular user and post from database */
  async findUserComments(postId: Types.ObjectId, userId: any) {
    const comments = isValidObjectId(userId)
      ? await this.findCommentsByUserId(postId, userId)
      : await this.findCommentsByUsername(postId, userId);

    return comments;
  }
}

export const commentService = new CommentService();
