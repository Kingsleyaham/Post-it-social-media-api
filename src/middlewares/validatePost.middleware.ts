import { NextFunction, Request, Response } from "express";
import postValidationSchema from "../schema/postValidation.schema";

export const validatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await postValidationSchema.validateAsync({
      ...req.body,
    },
      { abortEarly: false });

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};
