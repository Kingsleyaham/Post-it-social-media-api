import Joi from "joi";

export const userValidationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).trim(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim(),
  password: Joi.string().min(8),
  image: Joi.string(),
});

export const loginValidationSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .required(),
  password: Joi.string().min(8).required(),
});

export const signupValidationSchema = loginValidationSchema.keys({
  username: Joi.string().alphanum().min(3).trim().required(),
  image: Joi.string(),
});
