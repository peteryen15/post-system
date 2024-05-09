import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(6).max(50).email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,255}$"))
      .required(),
  });

  return schema.validate(data);
};
