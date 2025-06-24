import Joi from "joi";

export const validateData = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw new Error(error.details.map((err) => err.message).join(", "));
  }

  return value;
};
