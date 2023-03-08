import Joi from "joi";

const postValidationSchema = Joi.object({
  body: Joi.string().required().trim(),
});

export default postValidationSchema;
