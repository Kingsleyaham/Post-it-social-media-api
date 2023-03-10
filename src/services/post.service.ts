import { Types } from "mongoose";
import Post from "../models/post.model";

class PostService {
  async findOne(postId: Types.ObjectId) {
    return Post.findById(postId).where("isDeleted").equals(false).lean();
  }

  async findAll() {
    return Post.find({})
      .where("isDeleted")
      .equals(false)
      .sort({ createdAt: "desc" })
      .lean();
  }

  async createPost(userId: Types.ObjectId, newPost: string): Promise<any> {
    return Post.create({ content: newPost, user: userId });
  }

  async updatePost(
    postId: Types.ObjectId,
    userId: Types.ObjectId,
    post: string
  ) {
    const postExist: any = await this.findOne(postId);
    const postUser = new Types.ObjectId(postExist?.user);

    if (!postExist) throw new Error("error updated post");

    if (!(postUser == userId))
      throw new Error("You can only edit your own post");

    return Post.findByIdAndUpdate(postId, { content: post });
  }

  async deletePost(postId: Types.ObjectId, userId: Types.ObjectId) {
    const postExist: any = await this.findOne(postId);
    const postUser = new Types.ObjectId(postExist?.user);

    if (!postExist) throw new Error("post not found");

    if (!(postUser == userId))
      throw new Error("You can only delete your own post");

    return Post.findByIdAndUpdate(postId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export const postService = new PostService();
