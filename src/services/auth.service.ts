import bcrypt from "bcrypt";
import { userService } from "./user.service";
import { Types } from "mongoose";
import { ILogin } from "../interfaces/login.interface";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";
import { IToken } from "../interfaces/token.interface";

class AuthService {
  /** signs authentication token using user email and id. returns an access token */
  async signToken(userId: Types.ObjectId, email: string): Promise<IToken> {
    const payload = { sub: userId, email };

    const token = jwt.sign(payload, jwtConfig.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken: token };
  }

  async login(reqBody: ILogin): Promise<IToken> {
    const { email, password } = reqBody;
    const user = await userService.findByEmail(email);

    if (!user) throw new Error("Invalid email or password");

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) throw new Error("Invalid email or password");

    return this.signToken(user.id, user.email);
  }
}

export const authService = new AuthService();
