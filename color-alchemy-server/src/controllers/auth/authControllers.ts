import { Request, Response } from "express";
import { registerUser, loginUser } from "../../services/auth/authServices.js";
import { generateToken, cookieOptions } from "../../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  console.log("🔥 register controller received request");
  try {
    const user = await registerUser(req.body);
    const token = generateToken(user);
    res.cookie("accessToken", token, { ...cookieOptions, sameSite: "lax" });
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    const token = generateToken(user);
    res.cookie("accessToken", token, { ...cookieOptions, sameSite: "lax" });
    res.status(200).json({ message: "Login successful", user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (_: Request, res: Response): Promise<void> => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out" });
};

export const checkAuth = async (
  req: Request & { user?: any },
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
    }

    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
