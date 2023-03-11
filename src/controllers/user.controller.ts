import { MESSAGES } from "./../constants/index";
import { userService } from "../services/user.service";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { createImageTag } from "../utils/createImageTag";

class UserController {
  /** Fetch all users from database */
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();

      return res.status(200).json({ success: true, users });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Fetch a single user from database using id */
  async findUser(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);
      const user = await userService.findById(id);

      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "user not found" });

      // create an image tag using avatarUrl
      const img = createImageTag(user.avatarUrl, user.username);

      return res
        .status(200)
        .json({ success: true, user: { ...user._doc, img } });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Updates user info in database using id */
  async updateUser(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);

      await userService.updateUser(id, req.body);

      return res.status(201).json({ success: true, message: MESSAGES.UPDATED });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** Delete a user in database using id */
  async deleteUser(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);

      await userService.deleteUser(id);

      return res.status(200).json({ success: true, message: MESSAGES.DELETED });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const userController = new UserController();
