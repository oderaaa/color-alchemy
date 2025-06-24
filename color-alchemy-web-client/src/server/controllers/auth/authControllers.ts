import { Request, Response } from "express";
import { registerUser, loginUser } from "../../services/auth/authServices";
import { generateToken, cookieOptions } from "../../utils/jwt";

// ✅ ADD: Framework-agnostic business logic functions
export const registerLogic = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const user = await registerUser(userData);
  const token = generateToken(user);
  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginLogic = async (credentials: {
  email: string;
  password: string;
}) => {
  const user = await loginUser(credentials);
  const token = generateToken(user);
  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const logoutLogic = async () => {
  // No business logic needed for logout, just clear cookie
  return { message: "Logged out" };
};

export const checkAuthLogic = async (userId: string) => {
  // In serverless, we'll get user from JWT token validation
  // This is just for structure - actual logic will be in API route
  return { user: { _id: userId } };
};

// ✅ KEEP: Original Express controllers (unchanged for backward compatibility)
export const register = async (req: Request, res: Response) => {
  console.log("🔥 register controller received request");
  try {
    const result = await registerLogic(req.body);
    res.cookie("accessToken", result.token, {
      ...cookieOptions,
      sameSite: "lax",
    });
    res.status(201).json({ message: "User registered", user: result.user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginLogic(req.body);
    res.cookie("accessToken", result.token, {
      ...cookieOptions,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Login successful", user: result.user });
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
