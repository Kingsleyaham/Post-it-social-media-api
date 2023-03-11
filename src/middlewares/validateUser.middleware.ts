import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import {
  userValidationSchema,
  loginValidationSchema,
  signupValidationSchema,
} from "../schema/userValidation.schema";
export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let schema: Joi.ObjectSchema<any>;

  switch (req.path) {
    case "/signup":
      schema = signupValidationSchema;
      break;

    case "/login":
      schema = loginValidationSchema;
      break;

    default:
      schema = userValidationSchema;
      break;
  }

  try {
    await schema.validateAsync({
      ...req.body,
    });

    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.message });
  }
};
