import type { ErrorRequestHandler } from "express";
import { ErrorHandler } from "../utils/errorHandler";

// General error handler middleware

export const errorHandler: ErrorRequestHandler = (
  err: ErrorHandler,
  req,
  res,
  _next
) => {
  console.error(err.stack);

  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later.",
  });
};

export const mongooseErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.errors,
    });
    return;
  } else if (err.code && err.code === 11000) {
    res.status(400).json({
      success: false,
      message: "Duplicate Key Error",
      error: err.message,
    });
    return;
  }

  next(err);
};
