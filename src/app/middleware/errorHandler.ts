import { Request, Response, NextFunction } from 'express';
import AppError from "../error/AppError";

export default function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }

  return response.status(500).json({
    status: 500,
    message: "Internal server error"
  })
}
