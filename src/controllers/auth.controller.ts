import { MESSAGES } from "./../constants";
import { authService } from "./../services/auth.service";
import { ILogin } from "../interfaces/login.interface";
import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { handleError } from "../utils/handleError";

class AuthController {
  /** Create an account for a user */
  async signup(req: Request, res: Response) {
    try {
      await userService.createUser(req.body);

      res.status(201).json({ success: true, message: MESSAGES.CREATED });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }

  /** login a user */
  async login(req: Request, res: Response) {
    const reqBody: ILogin = req.body;
    try {
      const user = await authService.login(reqBody);

      return res.status(200).json({ success: true, ...user });
    } catch (err: any) {
      const message = handleError(err);
      res.status(401).json({ success: false, message });
    }
  }
}

export const authController = new AuthController();
