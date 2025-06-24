import jwt from "jsonwebtoken";
import { UserPayload, GUEST_USER } from "../models/user/types";

export const extractUserFromToken = (
  cookieHeader: string | null
): UserPayload => {
  if (!cookieHeader) return GUEST_USER;

  const token = cookieHeader.split("accessToken=")[1]?.split(";")[0];

  if (!token) return GUEST_USER;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return decoded;
  } catch (error) {
    return GUEST_USER;
  }
};
