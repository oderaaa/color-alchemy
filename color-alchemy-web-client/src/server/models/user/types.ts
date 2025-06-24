import { Document } from "mongoose";
import Joi from "joi";
import { JwtPayload } from "jsonwebtoken";

export type Role = "user" | "admin" | "guest";

export interface UserType extends Document {
  username: string;
  email: string;
  password: string;
  stats: {
    wins: number;
    losses: number;
  };
  role: "user" | "admin" | "guest";
  matchPassword(password: string): Promise<boolean>;
}

export interface AuthData {
  username?: string;
  email: string;
  password: string;
}

export interface UserPayload extends JwtPayload {
  _id: string;
  email?: string;
  role: Role;
}

export const GUEST_USER: UserPayload = {
  _id: "guest",
  role: "guest",
};

export const RegisterSchemaValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const LoginSchemaValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
