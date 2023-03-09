import { postService } from "../services/post.service";
import { RequestWithUser } from "./../interfaces/request.interface";
import { Response } from "express";
import { ICreatePost } from "../interfaces/createPost.interface";
import { Types } from "mongoose";

class PostController {
  /** Fetch all posts from database sorted by newest first  */
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const posts = await postService.findAll();

      return res.status(200).json({ success: true, posts });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Creates a new post and stores it in database along with the user that created the post */
  async create(req: RequestWithUser, res: Response) {
    const userId = req.user.sub;
    const reqBody: ICreatePost = req.body;
    try {
      const post = await postService.createPost(userId, reqBody.content);

      return res.status(201).json({ success: true, post });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Fetch a single post from database using post id*/
  async findOne(req: RequestWithUser, res: Response) {
    try {
      const postId = new Types.ObjectId(req.params.id);
      const post = await postService.findOne(postId);

      if (post) {
        return res.status(200).json({ success: true, post });
      }

      return res.status(404).json({ success: 0, message: "post not found" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Updates a post in database using post id. A post can only be edited by the owner */
  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const reqBody: ICreatePost = req.body;
      const postId = new Types.ObjectId(req.params.id);

      await postService.updatePost(postId, userId, reqBody.content);

      return res
        .status(201)
        .json({ success: true, message: "Post updated successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Delete a single post using post id. A post can only be deleted by the owner */
  async delete(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const postId = new Types.ObjectId(req.params.id);

      await postService.deletePost(postId, userId);

      return res
        .status(200)
        .json({ success: true, message: "Post deleted successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const postController = new PostController();
