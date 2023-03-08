import { Types } from "mongoose";
import { ICreatePost } from "../interfaces/createPost.interface";
import Post from "../models/post.model";

class PostService {
  async findOne(id: Types.ObjectId) {
    return Post.findById(id).where("isDeleted").equals(false);
  }

  async findAll() {
    return Post.find({}).where("isDeleted").equals(false);
  }

  async createPost(userId: Types.ObjectId, newPost: ICreatePost): Promise<any> {
    return Post.create({ body: newPost.body, user: userId });
  }

  async updatePost(id: Types.ObjectId, post: string) {
    const postExist = await this.findOne(id);

    if (!postExist) throw new Error("error updated post");

    return Post.findByIdAndUpdate(id, { body: post });
  }

  async deletePost(id: Types.ObjectId) {
    const postExist = await this.findOne(id);

    if (!postExist) throw new Error("post not found");

    return Post.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}

export const postService = new PostService();
