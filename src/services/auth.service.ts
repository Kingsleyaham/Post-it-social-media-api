import { userService } from "./user.services";
import { Types } from "mongoose";
import { ILogin } from "./interfaces/login.interface";
import { passwordCompare } from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";
import { IToken } from "./interfaces/token.interface";

class AuthService {
  async signToken(userId: Types.ObjectId, email: string): Promise<IToken> {
    const payload = { sub: userId, email };

    const token = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    return { accessToken: token };
  }

  async login(reqBody: ILogin): Promise<IToken> {
    const { email, password } = reqBody;
    const user = await userService.findByEmail(email);

    if (!user) throw new Error("Invalid email or password");

    const pwdMatch = await passwordCompare(password, user.password);

    if (!pwdMatch) throw new Error("Invalid email or password");

    return this.signToken(user.id, user.email);
  }
}

export const authService = new AuthService();
