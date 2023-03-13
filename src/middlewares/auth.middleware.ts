import { RequestWithUser } from "./../interfaces/request.interface";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config";

export const requireAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  //   check json web token exists and is verified
  if (token) {
    jwt.verify(token, jwtConfig.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "an error occured" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "you are unauthenticated please login to access route",
    });
  }
};
