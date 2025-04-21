import { CorsOptions } from "cors";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import config from "../providers/config";

const { origin, methods, allowedHeaders, optionsSuccessStatus } =
  config.get("cors");

export const CORS_OPTIONS: CorsOptions = {
  origin,
  methods,
  allowedHeaders,
  optionsSuccessStatus,
  credentials: true, // To enable HttpOnly cookie
};

export const LIMIT_OPTIONS: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 150, // 150 req per 15 minutes
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, please try again later",
});

export const GITHUB_ENDPOINT = "https://api.github.com";

export const DEFAULT_PROJECTS_LIMIT = 10;
export const MAX_PROJECTS_LIMIT = 40;
