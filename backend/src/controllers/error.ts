import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
}

class ErrorController {
  static handler(
    error: AppError,
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction,
  ): Response {
    const statusCode = error?.statusCode || 500;
    const message = error?.message || "Internal server error";

    return res.status(statusCode).json({ message });
  }
}

export default ErrorController;
