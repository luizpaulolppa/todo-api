import { Response, NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
import AppError from "../error/AppError";
import TokenPayload from "../dto/TokenPayload";

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    request.body = { ...request.body, userId: sub };
    return next();
  } catch (ex) {
    throw new AppError("Invalid JWT token", 401);
  }
}
