import jwt from "jsonwebtoken";
import { UserType } from "../models/user/types";

export const generateToken = (user: Partial<UserType>) => {
  return jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
