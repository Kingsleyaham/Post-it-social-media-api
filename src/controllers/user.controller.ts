import { userService } from "./../services/user.services";
import { Request, Response } from "express";
import { Types } from "mongoose";

class UserController {
  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();

      res.status(200).json({ success: true, users });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async findUser(req: Request, res: Response) {
    const id = new Types.ObjectId(req.params.id);
    try {
      const user = await userService.findById(id);
      if (user) {
        return res.status(200).json({ success: true, user });
      }

      return res.status(401).json({ success: 0, message: "user not found" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = new Types.ObjectId(req.params.id);
    try {
      await userService.updateUser(id, req.body);

      return res
        .status(201)
        .json({ success: true, message: "User updated successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = new Types.ObjectId(req.params.id);
    try {
      await userService.deleteUser(id);

      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const userController = new UserController();
