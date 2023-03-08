import { authService } from "./../services/auth.service";
import { ILogin } from "./../services/interfaces/login.interface";
import { Request, Response } from "express";
import { userService } from "../services/user.services";

class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const newUser = await userService.createUser(req.body);

      res.status(201).json({ success: true, user: newUser });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

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
