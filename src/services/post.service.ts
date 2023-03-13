import { userService } from "./user.service";
import { isValidObjectId, Types } from "mongoose";
import Post from "../models/post.model";
import { throwError } from "../utils/throwError";
import { parseId } from "../utils/parseId";

class PostService {
  /** Fetch a single post using postId */
  async findOne(postId: Types.ObjectId) {
    return Post.findById(postId).where("isDeleted").equals(false).lean();
  }

  /** Fetch all posts from database */
  async findAll() {
    return Post.find({})
      .where("isDeleted")
      .equals(false)
      .sort({ createdAt: "desc" })
      .lean();
  }

  /** Create a new post in database */
  async createPost(userId: Types.ObjectId, newPost: string): Promise<any> {
    return Post.create({ content: newPost, user: userId });
  }

  /** Update a post in database using postId */
  async updatePost(
    postId: Types.ObjectId,
    userId: Types.ObjectId,
    post: string
  ) {
    const postExist: any = await this.findOne(postId);
    const postUser = parseId(postExist?.user);

    if (!postExist) throwError("post not found");

    if (!(postUser == userId)) throwError("You can only edit your own post");

    return Post.findByIdAndUpdate(postId, { content: post });
  }

  /** Update a post in database using postId */
  async deletePost(postId: Types.ObjectId, userId: Types.ObjectId) {
    const postExist: any = await this.findOne(postId);
    const postUser = parseId(postExist?.user);

    if (!postExist) throwError("post not found");

    if (!(postUser == userId)) throwError("You can only delete your own post");

    return Post.findByIdAndUpdate(postId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  // Fetching comments by user i.e using user id or @username

  /** Fetch a single user post using userId and postId */
  async findOneByUserId(postId: Types.ObjectId, userId: Types.ObjectId) {
    return Post.findById(postId)
      .where("user")
      .equals(userId)
      .where("isDeleted")
      .equals(false)
      .lean();
  }

  /** Fetch a single user post using username and postId */
  async findOneByUsername(postId: Types.ObjectId, username: string) {
    const user = await userService.findByUsername(username);

    if (!user) throw new Error("invalid user handle");

    const userId = parseId(user._id);

    return this.findOneByUserId(postId, userId);
  }

  /** Fetch a single user post from database */
  async findOneUserPost(userId: any, postId: Types.ObjectId) {
    const post = isValidObjectId(userId)
      ? await this.findOneByUserId(postId, userId)
      : await this.findOneByUsername(postId, userId);

    return post;
  }

  /** Fetch user posts by userId */
  async findPostsByUserId(userId: Types.ObjectId) {
    return Post.find({})
      .where("user")
      .equals(userId)
      .where("isDeleted")
      .equals(false)
      .sort({ createdAt: "desc" })
      .lean();
  }

  /** Fetch user posts by username */
  async findPostsByUsername(username: string) {
    const user = await userService.findByUsername(username);
    const userId = parseId(user?._id);

    return this.findPostsByUserId(userId);
  }

  /** Fetch all posts of a particular user from database */
  async findUserPosts(userId: any) {
    const posts = isValidObjectId(userId)
      ? await this.findPostsByUserId(userId)
      : await this.findPostsByUsername(userId);

    return posts;
  }
}

export const postService = new PostService();
