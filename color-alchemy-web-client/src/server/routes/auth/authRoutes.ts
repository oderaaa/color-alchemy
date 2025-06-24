import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import {
  register,
  login,
  logout,
  checkAuth,
} from "../../controllers/auth/authControllers.js";
import { protect } from "../../middlewares/auth/authMiddlewares.js";
import {
  RegisterSchemaValidator,
  LoginSchemaValidator,
} from "../../models/user/types.js";
import { validateInput } from "../../middlewares/validateInput.js";

const router = express.Router();

/**
 * @route POST /auth/logout
 * @desc Log out a user by invalidating their refresh token
 * @access Protected
 */
router.post("/logout", protect, asyncHandler(logout));

/**
 * @route POST /auth/register
 * @desc Register a new user with email and password
 * @access Public
 */
router.post(
  "/register",
  (req, res, next) => {
    console.log("🔥 /register route received request");
    next();
  },
  validateInput(RegisterSchemaValidator),
  asyncHandler(register)
);

/**
 * @route POST /auth/login
 * @desc Log in a user with email and password
 * @access Public
 */
router.post(
  "/login",
  (req, res, next) => {
    console.log("🔥 /login route received request");
    next();
  },
  validateInput(LoginSchemaValidator), // Validate input fields
  asyncHandler(login)
);

/**
 * @route GET /auth/me
 * @desc Get the current user's information
 * @access Protected
 */
router.get("/me", protect, asyncHandler(checkAuth));

export default router;
