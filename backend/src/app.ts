import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRouter from "./api/routes/auth";
import { CORS_OPTIONS, LIMIT_OPTIONS } from "./constants";
import AppError from "./utils/HttpError";
import ErrorController from "./controllers/error";
import projectsRouter from "./api/routes/projects";

const app = express();

// Security
app.use(cors(CORS_OPTIONS)).use(helmet());

// Rate limits
app.use(LIMIT_OPTIONS);

// Parsers
app.use(express.json()).use(cookieParser());

// Optimization
app.use(compression());

// Routes
app.use("/auth", authRouter);
app.use("/projects", projectsRouter);

// 404 Handler
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError("Route not found", 404));
});

// Error Handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  ErrorController.handler(err, req, res, next);
});

export default app;
