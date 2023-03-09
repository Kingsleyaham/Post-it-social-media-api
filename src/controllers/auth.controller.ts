import { createImageTag } from "./../utils/createImageTag";
import { authService } from "./../services/auth.service";
import { ILogin } from "../interfaces/login.interface";
import { Request, Response } from "express";
import { userService } from "../services/user.service";

class AuthController {
  /** Create an account for a user */
  async signup(req: Request, res: Response) {
    try {
      const newUser = await userService.createUser(req.body);

      const { password, ...responseUser } = newUser._doc;

      // create an image tag using avatarUrl
      const imgTag = createImageTag(
        responseUser.avatarUrl,
        responseUser.username
      );

      res
        .status(201)
        .json({ success: true, user: { ...responseUser, imgTag } });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  /** login a user */
  async login(req: Request, res: Response) {
    const reqBody: ILogin = req.body;
    try {
      const user = await authService.login(reqBody);

      return res.status(200).json({ success: true, ...user });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }
}

export const authController = new AuthController();
