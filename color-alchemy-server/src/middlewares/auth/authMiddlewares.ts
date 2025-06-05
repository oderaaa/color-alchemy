import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserModel from "../../models/user/index.js";
import { ErrorHandler } from "../../utils/errorHandler.js";

interface DecodedToken {
  _id: string;
  iat: number;
  exp: number;
}

export const protect = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new ErrorHandler(401, "Not authorized, no token"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const user = await UserModel.findById(decoded._id).select("-password");

    if (!user) {
      return next(new ErrorHandler(401, "Not authorized, user not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Not authorized, token invalid"));
  }
};
