import { postService } from "./../services/post.services";
import { RequestWithUser } from "./../interfaces/request.interface";
import { Response } from "express";
import { ICreatePost } from "../interfaces/createPost.interface";
import { Types } from "mongoose";

class PostController {
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const posts = await postService.findAll();

      res.status(200).json({ success: true, posts });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async create(req: RequestWithUser, res: Response) {
    const userId = req.user.sub;
    const reqBody: ICreatePost = req.body;

    try {
      const post = await postService.createPost(userId, reqBody);
      return res.status(201).json({ success: true, post });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async findOne(req: RequestWithUser, res: Response) {
    const id = new Types.ObjectId(req.params.id);
    try {
      const user = await postService.findOne(id);
      if (user) {
        return res.status(200).json({ success: true, user });
      }

      return res.status(404).json({ success: 0, message: "post not found" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async update(req: RequestWithUser, res: Response) {
    const id = new Types.ObjectId(req.params.id);
    const reqBody: ICreatePost = req.body;

    try {
      await postService.updatePost(id, reqBody.body);

      return res
        .status(201)
        .json({ success: true, message: "Post updated successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async delete(req: RequestWithUser, res: Response) {
    const id = new Types.ObjectId(req.params.id);

    try {
      await postService.deletePost(id);

      return res
        .status(200)
        .json({ success: true, message: "Post deleted successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const postController = new PostController();
