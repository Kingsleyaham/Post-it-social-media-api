import { parseId } from "./../utils/parseId";
import { MESSAGES } from "./../constants";
import { postService } from "../services/post.service";
import { RequestWithUser } from "./../interfaces/request.interface";
import { Response } from "express";
import { ICreatePost } from "../interfaces/createPost.interface";
import { throwError } from "../utils/throwError";
import { handleError } from "../utils/handleError";

class PostController {
  /** Fetch all posts from database sorted by newest first  */
  async findAll(req: RequestWithUser, res: Response) {
    try {
      const posts = await postService.findAll();

      return res.status(200).json({ success: true, posts });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Creates a new post and stores it in database along with the user that created the post */
  async create(req: RequestWithUser, res: Response) {
    const userId = req.user.sub;
    const reqBody: ICreatePost = req.body;
    try {
      await postService.createPost(userId, reqBody.content);

      return res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Fetch a single post from database using post id*/
  async findOne(req: RequestWithUser, res: Response) {
    try {
      const postId = parseId(req.params.id);

      const post = await postService.findOne(postId);

      if (!post) throwError("post not found");

      return res.status(200).json({ success: true, post });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Updates a post in database using post id. A post can only be edited by the owner */
  async update(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const reqBody: ICreatePost = req.body;
      const postId = parseId(req.params.id);

      await postService.updatePost(postId, userId, reqBody.content);

      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Delete a single post using post id. A post can only be deleted by the owner */
  async delete(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user.sub;
      const postId = parseId(req.params.id);

      await postService.deletePost(postId, userId);

      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }
}

export const postController = new PostController();
