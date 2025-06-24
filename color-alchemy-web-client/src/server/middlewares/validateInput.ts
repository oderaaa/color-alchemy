import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateInput = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("Validating input...");
    console.log("Request Body:", req.body); // Debugging

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res
        .status(400)
        .json({ message: error.details.map((err) => err.message) });
      return;
    }
    next();
  };
};
