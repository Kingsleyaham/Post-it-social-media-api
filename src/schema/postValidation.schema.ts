import Joi from "joi";

const postValidationSchema = Joi.object({
  content: Joi.string().required().trim(),
});

export default postValidationSchema;
