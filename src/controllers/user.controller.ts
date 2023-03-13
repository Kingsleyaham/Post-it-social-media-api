import { handleError } from "./../utils/handleError";
import { MESSAGES } from "./../constants/index";
import { userService } from "../services/user.service";
import { Request, Response } from "express";
import { createImageTag } from "../utils/createImageTag";
import { postService } from "../services/post.service";
import { parseId } from "../utils/parseId";
import { commentService } from "../services/comment.service";

class UserController {
  /** Fetch all users from database */
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();

      return res.status(200).json({ success: true, users });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Fetch a single user from database using id, @username */
  async findUser(req: Request, res: Response) {
    try {
      const id = req.params.id.includes("@")
        ? req.params.id.split("@")[1]
        : parseId(req.params.id);

      const user = await userService.findOne(id);

      if (!user) throw new Error("user not found");

      // create an image tag using avatarUrl
      const img = createImageTag(user.avatarUrl, user.username);

      return res
        .status(200)
        .json({ success: true, user: { ...user._doc, img } });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Updates user info in database using id */
  async updateUser(req: Request, res: Response) {
    try {
      const id = parseId(req.params.id);

      await userService.updateUser(id, req.body);

      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Delete a user in database using id */
  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseId(req.params.id);

      await userService.deleteUser(id);

      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  // controllers to handle fetching of user posts and comments

  /** Fetch users posts from database using user id or @username */
  async findPostsByUser(req: Request, res: Response) {
    try {
      // check if userId is @username or id and store it in id variable
      const id = req.params.userId.includes("@")
        ? req.params.userId.split("@")[1]
        : parseId(req.params.userId);

      const posts = await postService.findUserPosts(id);

      return res.status(200).json({ success: true, posts });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Fetch a single user post from database using user id or @username  and and also post id*/
  async findOnePostByUser(req: Request, res: Response) {
    try {
      const postId = parseId(req.params.id);
      const userId = req.params.userId.includes("@")
        ? req.params.userId.split("@")[1]
        : parseId(req.params.userId);

      const post = await postService.findOneUserPost(userId, postId);

      if (!post) throw new Error("post not found");

      return res.status(200).json({ success: true, post });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Fetch users comment on a post from database using user id or @username */
  async findCommentsByUser(req: Request, res: Response) {
    try {
      const postId = parseId(req.params.postId);
      const userId = req.params.userId.includes("@")
        ? req.params.userId.split("@")[1]
        : parseId(req.params.userId);

      const comments = await commentService.findUserComments(postId, userId);

      return res.status(200).json({ success: true, comments });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** Fetch a single comment on a post by user from database using user id or @username and also comment and post id*/
  async findOneCommentByUser(req: Request, res: Response) {
    try {
      const commentId = parseId(req.params.id);
      const postId = parseId(req.params.postId);
      const userId = req.params.userId.includes("@")
        ? req.params.userId.split("@")[1]
        : parseId(req.params.userId);

      const comment = await commentService.findOneUserComment(
        userId,
        postId,
        commentId
      );

      if (!comment) throw new Error("comment not found");

      return res.status(200).json({ success: true, comment });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }
}

export const userController = new UserController();
